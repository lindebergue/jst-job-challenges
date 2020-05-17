import * as React from 'react'
import { Provider } from 'react-redux'

import { store } from '../data/store'

import { Overview } from './Overview'

export const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <Overview />
    </Provider>
  )
}
