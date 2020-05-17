import * as React from 'react'
import cx from 'classnames'
import { random } from 'lodash'

import styles from './styles.scss'

export interface ShimmerProps {
  className?: string
  style?: React.CSSProperties
  width: number | string
  height: number | string
}

export const Shimmer: React.FunctionComponent<ShimmerProps> = ({
  className,
  style,
  width,
  height
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [backgroundSize, setBackgroundSize] = React.useState('')

  React.useEffect(() => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) {
      return
    }
    setBackgroundSize(`${rect.width * 10}px ${rect.height}px`)
  }, [width, height])

  return (
    <div
      ref={ref}
      className={cx(styles.shimmer, className)}
      style={{
        ...style,
        backgroundSize,
        width: width === 'random' ? `${random(50, 100)}%` : width,
        height: height === 'random' ? `${random(50, 100)}%` : height
      }}
    />
  )
}
