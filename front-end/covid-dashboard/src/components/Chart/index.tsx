import * as React from 'react'
import { VegaLite } from 'react-vega'

import { Shimmer } from '../Shimmer'

import styles from './styles.scss'

export interface ChartProps {
  title: string
  spec: object
  data?: { [key: string]: unknown }
}

export const Chart: React.FunctionComponent<ChartProps> = ({
  title,
  spec,
  data
}) => {
  const ref = React.useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} className={styles.chart}>
      <h3 className={styles.title}>
        {title}
      </h3>
      {data ? (
        <VegaLite
          spec={{
            ...spec,
            height: 400,
            autosize: 'fit'
          }}
          data={data}
          actions={false}
        />
      ) : (
        <Shimmer
          width='100%'
          height={400}
        />
      )}
    </div>
  )
}
