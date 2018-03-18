import React    from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore'
import createRoutes from './routes'
import Root from './containers/Root'

const { persistor, store } = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const routes = createRoutes(React, history, store)

ReactDOM.render(
  <Root persistor={persistor} store={store}>
    {routes}
  </Root>,
  document.getElementById('app')
)
