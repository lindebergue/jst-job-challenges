import * as React from 'react'
import { useSelector } from 'react-redux'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Grid, GridCell } from '../components/Grid'
import { Gauge } from '../components/Gauge'
import { useMobileBreakpoint } from '../lib/useMobileBreakpoint'
import { Chart } from '../components/Chart'
import { State } from '../data/types'
import { recoveredColor, deathsColor, confirmedColor } from '../lib/legendColors'

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
            name='Recuperados'
            value={overview.cases?.recovered}
            color={recoveredColor}
          />
        </GridCell>
        <GridCell row={2} column={isMobile ? '1 / 4' : 1}>
          <Gauge
            name='Óbitos'
            value={overview.cases?.deaths}
            color={deathsColor}
          />
        </GridCell>
        <GridCell row={2} column={isMobile ? '4 / 7' : 2}>
          <Gauge
            name='Letalidade'
            value={overview.cases?.lethality}
            format='percent'
          />
        </GridCell>
        <GridCell row={isMobile ? 3 : '1 / 3'} column={isMobile ? '1 / 7' : '3 / 7'}>
          <Chart
            title='Histórico de casos'
            spec={{}}
          />
        </GridCell>
        <GridCell row={isMobile ? 4 : 3} column='1 / 7'>
          <Chart
            title='Mapa de incidência'
            spec={{}}
          />
        </GridCell>
      </Grid>
      <Footer />
    </>
  )
}
