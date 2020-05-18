import * as React from 'react'

import { Chart } from '../Chart'

import spec from './spec.json'

export interface StackedBarChartProps {
  title: string
  values?: {
    date: Date
    type: 'confirmed' | 'recovered' | 'dead'
    value: number
  }[]
}

export const StackedBarChart: React.FunctionComponent<StackedBarChartProps> = ({
  title,
  values
}) => {
  return (
    <Chart
      title={title}
      spec={spec}
      data={{ values }}
    />
  )
}
