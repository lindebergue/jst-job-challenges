import * as React from 'react'

import { Shimmer } from '../Shimmer'

import styles from './styles.scss'

export type GaugeFormat = 'number' | 'percent'

export interface GaugeProps {
  name: string
  value?: number
  format?: GaugeFormat
}

export const Gauge: React.FunctionComponent<GaugeProps> = ({
  name,
  value,
  format = 'number'
}) => {
  return (
    <div className={styles.gauge}>
      {value ? (
        <div className={styles.value}>
          {formatValue(value, format)}
        </div>
      ) : (
        <Shimmer className={styles.value} width='random' height={56} />
      )}
      <h3 className={styles.name}>
        {name}
      </h3>
    </div>
  )
}

function formatValue(value: number, format: GaugeFormat): string {
  switch (format) {
    case 'number':
      return value.toLocaleString('pt-BR')
    case 'percent':
      return `${value.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} %`
  }
}
