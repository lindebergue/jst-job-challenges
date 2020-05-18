import * as React from 'react'
import cx from 'classnames'

import styles from './styles.scss'

export interface LoaderProps {
  loading?: boolean
  children: React.ReactNode
}

export const Loader: React.FunctionComponent<LoaderProps> = ({
  loading,
  children
}) => (
  <>
    <div
      className={cx(styles.loader,
        {
          [styles.visible]: loading
        }
      )}
    >
      <img className={styles.img} src={require('../../assets/images/virus.svg').default} />
      <p className={styles.message}>
        Baixando dados...
      </p>
    </div>
    {children}
  </>
)
