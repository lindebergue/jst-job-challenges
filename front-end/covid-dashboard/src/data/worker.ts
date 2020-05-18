/* eslint-disable no-console */
import { parse } from 'date-fns'
import { last } from 'lodash'

import { fetchStates, fetchTopoJSON, fetchMunicipalities, TOPOJSONDetailLevel } from '../services/ibge-api'
import { fetchStats } from '../services/covid-api'

import { db, LocationStats } from './database'
import { WorkerResult } from './types'

export declare var self: Worker

type PlainObject = { [key: string]: any }

function groupBy<T extends PlainObject>(data: T[], key: string): { [key: string]: T[] } {
  return data.reduce((results: { [key: string]: T[] }, item) => {
    const keyValue = item[key]
    if (keyValue in results) {
      results[keyValue].push(item)
    } else {
      results[keyValue] = [item]
    }
    return results
  }, {})
}

function pickMax<T extends PlainObject>(data: T[], key: string): T {
  return data.reduce((prev, curr) => {
    return curr[key] > prev[key] ? curr : prev
  })
}

async function populateDatabase(): Promise<void> {
  const info = await db.datasetInfo.get('__dataset__')
  if (info) {
    console.log('database already populated')
    return
  }

  console.log('populating location data...')
  const states = await fetchStates()
  for (const state of states) {
    const geometry = await fetchTopoJSON(state.id, {
      detail: TOPOJSONDetailLevel.MUNICIPALITY
    })
    await db.location.put({
      id: state.id.toString(),
      name: state.nome,
      geometry
    })
  }

  console.log('fetching municipalities')
  const municipalities = await fetchMunicipalities()

  console.log('fetching stats...')
  const stats = await fetchStats()

  const locationStats: LocationStats[] = []
  for (const stat of stats) {
    let topoJSONId: string

    // por algum motivo, os ids dos municípios não são os mesmos utilizados pelo IBGE
    if (stat.codmun) {
      const municipality = municipalities.find((item) => item.id.toString().indexOf(stat.codmun!) === 0)
      if (!municipality) {
        console.warn(`no municipality found for ${stat.codmun}`)
        topoJSONId = stat.codmun
      } else {
        topoJSONId = municipality.id.toString()
      }
    } else {
      topoJSONId = stat.coduf!
    }

    locationStats.push({
      locationId: stat.coduf!,
      topoJSONId,
      date: parse(stat.data, 'yyyy-MM-dd', new Date()),
      confirmed: stat.casosAcumulado ? parseInt(stat.casosAcumulado) : 0,
      deaths: stat.obitosAcumulado ? parseInt(stat.obitosAcumulado) : 0,
      population: stat.populacaoTCU2019 ? parseInt(stat.populacaoTCU2019) : 0
    })
  }

  console.log('populating stats...')
  await db.locationStats.bulkAdd(locationStats)

  console.log('saving dataset...')
  await db.datasetInfo.put({ lastUpdate: new Date() }, '__dataset__')

  console.log('database populated')
}

async function getLocationStats(id: string): Promise<WorkerResult> {
  const info = await db.datasetInfo.get('__dataset__')

  const location = await db.location.get(id)
  if (!location) {
    throw new Error(`unknown location ${id}`)
  }

  const stats = await db.locationStats
    .where('locationId')
    .equals(id)
    .sortBy('date')

  const lastStat = last(stats)!

  return {
    location,
    cases: {
      confirmed: lastStat.confirmed,
      deaths: lastStat.deaths,
      spread: lastStat.population > 0 ? (lastStat.confirmed / lastStat.population) * 100_000 : 0,
      lethality: lastStat.population > 0 ? (lastStat.deaths / lastStat.population) * 100_000 : 0
    },
    casesTimeSeries: Object.values(groupBy(stats, 'date'))
      .map((stats) => pickMax(stats, 'confirmed'))
      .reduce(
        (timeSeries: any, stat) => {
          return timeSeries.concat([
            { date: stat.date, value: stat.confirmed, type: 'confirmed' },
            { date: stat.date, value: stat.deaths, type: 'dead' }
          ])
        },
        []
      ),
    mapTopoJSONData: location.geometry,
    mapValues: Object.values(groupBy(stats, 'topoJSONId'))
      .map((stats) => pickMax(stats, 'confirmed'))
      .map((stat) => ({
        topoJSONId: stat.topoJSONId,
        value: stat.confirmed
      })),
    updatedAt: info!.lastUpdate
  }
}

self.addEventListener('message', async (event) => {
  try {
    await populateDatabase()

    const { data } = event.data
    if (typeof data === 'string') {
      self.postMessage(await getLocationStats(data))
    } else {
      self.postMessage(await getLocationStats('26'))
    }
  } catch (err) {
    console.error('error processing data ', err)
    self.postMessage('error')
  }
})
