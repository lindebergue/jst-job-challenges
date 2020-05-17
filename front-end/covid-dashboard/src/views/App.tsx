import * as React from 'react'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Grid, GridCell } from '../components/Grid'
import { Gauge } from '../components/Gauge'
import { useMobileBreakpoint } from '../lib/useMobileBreakpoint'
import { Chart } from '../components/Chart'

export const App: React.FunctionComponent = () => {
  const isMobile = useMobileBreakpoint()

  return (
    <>
      <Header
        title='Painel Coronavírus - Brasil'
        lastUpdatedAt={new Date()}
      />
      <Grid rows={isMobile ? 4 : 3} columns={6}>
        <GridCell row={1} column={isMobile ? '1 / 4' : 1}>
          <Gauge name='Casos' />
        </GridCell>
        <GridCell row={1} column={isMobile ? '4 / 7' : 2}>
          <Gauge name='Recuperados' />
        </GridCell>
        <GridCell row={2} column={isMobile ? '1 / 4' : 1}>
          <Gauge name='Óbitos' />
        </GridCell>
        <GridCell row={2} column={isMobile ? '4 / 7' : 2}>
          <Gauge name='Letalidade' format='percent' />
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
