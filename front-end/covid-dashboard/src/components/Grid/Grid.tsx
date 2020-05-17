import * as React from 'react'

import styles from './styles.scss'

export interface GridProps {
  rows: number
  columns: number
  children: React.ReactNode
}

export const Grid: React.FunctionComponent<GridProps> = ({
  rows,
  columns,
  children
}) => (
  <div
    className={styles.grid}
    style={{
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, min-content)`
    }}
  >
    {children}
  </div>
)
