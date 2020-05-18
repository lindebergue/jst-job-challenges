import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'

import { Action, State, DataActionType, UIActionType, WorkerResult } from './types'
import reducers from './reducers'

export const store = createStore<State, Action, unknown, unknown>(
  reducers,
  process.env.NODE_ENV !== 'production' ? (
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  ) : (
    applyMiddleware(thunkMiddleware)
  )
)

export function hydrateStore(): Promise<void> {
  const worker = new Worker('./worker', { type: 'module' })
  return new Promise((resolve, reject) => {
    worker.addEventListener('message', (event) => {
      const { data } = event
      if (data === 'error') {
        reject(new Error('error hydrating store'))
        return
      }

      const result = data as WorkerResult
      store.dispatch({
        type: UIActionType.SELECT_LOCATION,
        payload: {
          location: result.location
        }
      })
      store.dispatch({
        type: DataActionType.OVERVIEW_OK,
        payload: result
      })

      resolve()
    })
    worker.postMessage(true)
  })
}
