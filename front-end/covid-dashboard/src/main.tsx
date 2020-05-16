import * as React from 'react'
import { render } from 'react-dom'

import { App } from './views/App'

const reactRoot = document.getElementById('react-root')
render(<App />, reactRoot)

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const NextApp = require('./views/App').App
    render(<NextApp />, reactRoot)
  })
}
