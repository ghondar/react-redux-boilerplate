import React from 'react'
import { Router, Route, IndexRoute, Redirect } from 'react-router'

import loadable from 'loadable-components'

import AppContainer from '../containers/AppContainer'

const Dashboard = loadable(() => import('../containers/Dashboard'))

export default (React, browserHistory, store) => (
  <Router history={browserHistory} >
    <Route component={AppContainer} path='/'>
      <IndexRoute component={Dashboard} />
    </Route>
  </Router>
)
