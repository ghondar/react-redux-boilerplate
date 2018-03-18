import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

class Dashboard extends Component {
  render() {
    return (
      <h1>
        Hola Mundo
      </h1>
    )
  }
}

export default hot(module)(Dashboard)
