import * as React from 'react'
import { useSelector } from 'react-redux'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Grid, GridCell } from '../components/Grid'
import { Gauge } from '../components/Gauge'
import { useMobileBreakpoint } from '../lib/useMobileBreakpoint'
import { StackedBarChart } from '../components/StackedBarChart'
import { ChoroplethMap } from '../components/ChoroplethMap'
import { State } from '../data/types'
import { deathsColor, confirmedColor } from '../lib/legendColors'

export const Overview: React.FunctionComponent = () => {
  const isMobile = useMobileBreakpoint()
  const { overview } = useSelector((state: State) => state.data)

  return (
    <>
      <Header
        title='Painel Coronavírus'
        lastUpdatedAt={new Date()}
      />
      <Grid rows={isMobile ? 4 : 3} columns={6}>
        <GridCell row={1} column={isMobile ? '1 / 4' : 1}>
          <Gauge
            name='Confirmados'
            value={overview.cases?.confirmed}
            color={confirmedColor}
          />
        </GridCell>
        <GridCell row={1} column={isMobile ? '4 / 7' : 2}>
          <Gauge
            name='Óbitos'
            value={overview.cases?.deaths}
            color={deathsColor}
          />
        </GridCell>
        <GridCell row={2} column={isMobile ? '1 / 4' : 1}>
          <Gauge
            name='Incidência (100 mil/ha)'
            value={overview.cases?.spread}
          />
        </GridCell>
        <GridCell row={2} column={isMobile ? '4 / 7' : 2}>
          <Gauge
            name='Letalidade (100 mil/ha)'
            value={overview.cases?.lethality}
          />
        </GridCell>
        <GridCell row={isMobile ? 3 : '1 / 3'} column={isMobile ? '1 / 7' : '3 / 7'}>
          <StackedBarChart
            title='Histórico de casos'
            values={overview.casesTimeSeries}
          />
        </GridCell>
        <GridCell row={isMobile ? 4 : 3} column='1 / 7'>
          <ChoroplethMap
            title='Mapa de incidência'
            values={overview.mapValues}
            topoJSON={overview.mapTopoJSONData}
          />
        </GridCell>
      </Grid>
      <Footer />
    </>
  )
}
