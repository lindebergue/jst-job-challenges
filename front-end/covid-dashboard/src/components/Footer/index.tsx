import * as React from 'react'

import styles from './styles.scss'

export const Footer: React.FunctionComponent = () => (
  <footer className={styles.footer}>
    Dados obtidos a partir do <a href='https://covid.saude.gov.br/' target='_blank'>painel COVID-19 do Governo Federal.</a>
  </footer>
)
