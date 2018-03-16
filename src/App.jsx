import React    from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'

import configureStore from './store/configureStore'
import createRoutes from './routes'
import Root from './containers/Root'

const { persistor, store } = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const routes = createRoutes(React, history, store)

// Hack React Hot Reloading
if(module.hot)
  module.hot.accept()

function renderApp(RootComponent) {
  ReactDOM.render(
    <AppContainer key={Math.random()}>
      <RootComponent persistor={persistor} store={store}>
        {routes}
      </RootComponent>
    </AppContainer>,
    document.getElementById('app')
  )
}

renderApp(Root)

if(module.hot)
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./containers/Root', () => renderApp(require('./containers/Root')))
