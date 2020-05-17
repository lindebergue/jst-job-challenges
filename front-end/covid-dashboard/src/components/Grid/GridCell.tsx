import * as React from 'react'

import styles from './styles.scss'

export interface GridCellProps {
  row: number | string
  column: number | string
  children: React.ReactNode
}

export const GridCell: React.FunctionComponent<GridCellProps> = ({
  row,
  column,
  children
}) => {
  const computedStyle: React.CSSProperties = {}
  if (typeof row === 'string') {
    computedStyle.gridRow = row
  } else {
    computedStyle.gridRowStart = row
    computedStyle.gridRowEnd = row + 1
  }
  if (typeof column === 'string') {
    computedStyle.gridColumn = column
  } else {
    computedStyle.gridColumnStart = column
    computedStyle.gridColumnEnd = column
  }

  return (
    <div className={styles.gridCell} style={computedStyle}>
      {children}
    </div>
  )
}
