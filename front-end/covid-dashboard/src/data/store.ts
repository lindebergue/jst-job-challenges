import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'

import { Action, State } from './types'
import reducers from './reducers'

export const store = createStore<State, Action, unknown, unknown>(
  reducers,
  process.env.NODE_ENV !== 'production' ? (
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  ) : (
    applyMiddleware(thunkMiddleware)
  )
)
