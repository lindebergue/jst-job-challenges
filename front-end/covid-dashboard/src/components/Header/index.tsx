import * as React from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBRLocale from 'date-fns/locale/pt-BR'

import styles from './styles.scss'

export interface HeaderProps {
  title: string
  lastUpdatedAt: Date
}

export const Header: React.FunctionComponent<HeaderProps> = ({
  title,
  lastUpdatedAt
}) => (
  <header className={styles.header}>
    <h2 className={styles.title}>
      {title}
    </h2>
    <h4 className={styles.lastUpdatedAt}>
      Atualizado {formatDistanceToNow(lastUpdatedAt, { locale: ptBRLocale, addSuffix: true })}
    </h4>
  </header>
)
