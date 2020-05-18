import * as React from 'react'
import { Provider } from 'react-redux'

import { store, hydrateStore } from '../data/store'

import { Overview } from './Overview'
import { Loader } from '../components/Loader'

export const App: React.FunctionComponent = () => {
  const [isPopulatingData, setPopulatingData] = React.useState(true)

  React.useEffect(() => {
    const start = Date.now()
    hydrateStore()
      .then(() => {
        // keep the loader screen visible for at least 600ms
        const elapsed = Date.now() - start
        if (elapsed < 600)  {
          setTimeout(() => setPopulatingData(false), 600 - elapsed)
        } else {
          setPopulatingData(false)
        }
      })
  }, [])

  return (
    <Provider store={store}>
      <Loader loading={isPopulatingData}>
        <Overview />
      </Loader>
    </Provider>
  )
}
