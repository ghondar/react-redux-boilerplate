import React, { Component } from 'react'

export default class Routing extends Component {
  render() {
    const { routeParams: { parent, child }, location: { state: { reactComponent } } } = this.props
    const CustomComponent = require(`../../containers/${parent}/${child}/${reactComponent}`)

    return (
      <CustomComponent {...this.props} />
    )
  }
}
