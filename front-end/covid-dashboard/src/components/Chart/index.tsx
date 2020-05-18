import * as React from 'react'
import { Vega } from 'react-vega'

import { Shimmer } from '../Shimmer'

import styles from './styles.scss'

export interface ChartProps {
  title: string
  spec: object
  data?: { [key: string]: any }
}

export const Chart: React.FunctionComponent<ChartProps> = ({
  title,
  spec,
  data
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    const handleResize = () => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) {
        return
      }
      setWidth(rect.width)
    }

    // set the chart size right away
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={ref} className={styles.chart}>
      <h3 className={styles.title}>
        {title}
      </h3>
      {data ? (
        <Vega
          renderer='svg'
          spec={{
            ...spec,
            width,
            height: 400,
            autosize: {
              type: 'fit',
              contains: 'padding'
            }
          }}
          data={data}
          config={{
            autosize: 'fit-x',
            background: '#2a282b',
            padding: 24,
            style: {
              'guide-label': { font: 'Inter', fontSize: 16, fill: '#fff' },
              'guide-title': { font: 'Inter', fontSize: 16, fill: '#fff' }
            },
            axis: {
              domainColor: '#fff',
              gridColor: '#5f606b',
              tickColor: '#fff'
            },
            legend: {
              layout: {
                anchor: 'middle'
              }
            }
          }}
          // actions={false}
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
