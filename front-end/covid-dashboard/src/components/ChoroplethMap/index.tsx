import * as React from 'react'

import { Chart } from '../Chart'

import spec from './spec.json'

export interface ChoroplethMapProps {
  title: string
  values?: {
    topoJSONId: string
    value: number
  }[]
  topoJSON?: object
}

export const ChoroplethMap: React.FunctionComponent<ChoroplethMapProps> = ({
  title,
  values,
  topoJSON
}) => {
  if (!values || !topoJSON) {
    return <Chart title={title} spec={spec} />
  }

  const specWithData = React.useMemo(() => {
    const newSpec = Object.assign({}, spec)
    newSpec.data[0].values = values
    newSpec.data[1].values = topoJSON
    return newSpec
  }, [values])

  return (
    <Chart
      title={title}
      spec={specWithData}
      data={{}}
    />
  )
}
