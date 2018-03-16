import React from 'react'
import { Router, Route, IndexRoute, Redirect } from 'react-router'

import AppContainer from '../containers/AppContainer'
import Dashboard from '../containers/Dashboard'

export default (React, browserHistory, store) => (
  <Router history={browserHistory} >
    <Route component={AppContainer} path='/'>
      <IndexRoute component={Dashboard} >
      </IndexRoute>
    </Route>
  </Router>
)
