import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

// Material Style Components
import AppBar from 'material-ui/AppBar'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import LinearProgress from 'material-ui/LinearProgress'
import MenuItem from 'material-ui/MenuItem'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { grey400 } from 'material-ui/styles/colors'

// Material SVG Icons
import Home from 'material-ui/svg-icons/action/home'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Power from 'material-ui/svg-icons/action/power-settings-new'
import Setting from 'material-ui/svg-icons/action/settings'

// Global Material Store
import muiThemeable from 'material-ui/styles/muiThemeable'

// CSS Styles
import toolbar from './Toolbar.styl'

let SelectableList = makeSelectable(List)

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children    : PropTypes.node.isRequired,
      defaultValue: PropTypes.string.isRequired
    }

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue
      })
    }

    render() {
      return (
        <ComposedComponent
          onChange={this._handleRequestChange}
          value={this.state.selectedIndex}>
          {this.props.children}
        </ComposedComponent>
      )
    }

    _handleRequestChange = (event, index) => {
      if(index)
        this.setState({
          selectedIndex: index
        })
    }
  }
}

SelectableList = wrapState(SelectableList)

const Logged = props => (
  <div>
    <IconMenu
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      iconButtonElement={<IconButton><MoreVertIcon color='white' /></IconButton>}
      targetOrigin={{ horizontal: 'right', vertical: 'top' }}>
      <MenuItem primaryText='Perfil' />
      <MenuItem
        onClick={() => {
          props.router.push('/')
        }} primaryText='Inicio' />
      <MenuItem
        onClick={() => {
          props.onLogout()
        }} primaryText='Cerrar Sesión' />
    </IconMenu>
  </div>
)

const MenuList = props => (
  <div className={toolbar.sideBarMenuList}>
    <div>
      <FontIcon className={'material-icons ' + toolbar.sideBarMenuIcon}>local_shipping</FontIcon>
    </div>
    <div className={toolbar.sideBarMenuTitle}>
      <span>{props.titleMenu}</span>
    </div>
  </div>
)

class Toolbar extends Component {
  state = {
    open      : false,
    expanded  : false,
    hover_list: false
  }

  componentDidMount() {
    const { menuStore: { Success } } = this.props
    !Success && this.props.fetchMenu(3)
  }

  _renderMenu(results) {
    return results.map(({ icono, idOpcfe, items, nombrecorto, url: parent }, i) => (
      <ListItem
        initiallyOpen={false}
        key={i}
        // leftAvatar={icono ? <FontIcon className={icono} /> : null}
        nestedItems={items.map(({ icono, idOpcfe, items, nombrecorto, url, reactComponent }, index) => (
          <ListItem
            className={toolbar.sideBarSubMenu}
            key={index}
            onClick={() => {this._handleLink(parent, url, reactComponent)}}
            primaryText={nombrecorto}
            value={url} />
        ))}
        onClick={parent === 'dashboard' ? this._handleGoHome : null}
        primaryText={<MenuList titleMenu={nombrecorto} />}
        primaryTogglesNestedList={true}
        value={items.length === 0 ? parent : undefined} />
    ))
  }

  closeSideBar() {
    this.setState({
      open: false
    })
  }

  render() {
    const { menuStore: { results, Loading }, router, removeAccess } = this.props
    const { open, expanded } = this.state

    const defaultValue = router.params.child ? router.params.child : 'dashboard'

    return (
      <div>
        <AppBar
          iconElementRight={<Logged onLogout={this._handleLogout} router={router} />}
          onLeftIconButtonTouchTap={this._handleToggle}
          title={'Santo Domingo'}>
        </AppBar>
        <Drawer
          containerStyle={{ overflow: 'none !important' }}
          docked={false}
          onRequestChange={open => this.setState({ open })}
          open={open}
          width={322}>
          <Card
            containerStyle={{
              backgroundColor: this.props.muiTheme.palette.primary1Color
            }}
            expanded={this.state.expanded}
            onExpandChange={this._handleExpandChange}>
            <div className={toolbar.image}>
              <img src={'https://santodomingocg.org/img/logo_empresa/Logo_SantoDomingo.png'} />
            </div>
            <CardHeader
              actAsExpander={true}
              avatar='https:/santodomingocg.org/img/user/14.jpg'
              showExpandableButton={true}
              subtitle='Gerente General'
              title='Alex Gonzales Rocha' />
          </Card>
          {
            expanded ?
              (
                <List>
                  <ListItem
                    leftAvatar={<Setting className={toolbar.sideBarMenuIcon} style={{ margin: 6 }} />}
                    primaryText='Configuracion' />
                  <ListItem
                    leftAvatar={<Power className={toolbar.sideBarMenuIcon} style={{ margin: 6 }} />}
                    onClick={this._handleLogout}
                    primaryText='Cerrar Sessión' />
                </List>
              ) :
              !Loading ?
                (
                  <div className={toolbar.sideBar}>
                    <div className={toolbar.sideBarScroll}>
                      <SelectableList
                        defaultValue={defaultValue}>
                        {this._renderMenu(results)}
                      </SelectableList>
                    </div>
                  </div>
                ) :
                (
                  <div className={toolbar.loading}>
                    <LinearProgress mode='indeterminate' />
                  </div>
                )
          }
        </Drawer>
      </div>
    )
  }

  _handleLogout = () => {
    this.props.removeAccess()
    this.props.router.replace('/login')
  }

  _handleGoHome = () => {
    this.props.router.push('/')
    this.closeSideBar()
  }

  _handleLink = (parent, child, reactComponent) => {
    const { router: { push } } = this.props

    push({
      pathname: `/proccess/${parent}/${child}`,
      state   : {
        reactComponent
      }
    })
    this.closeSideBar()
  }

  _handleExpandChange = (newState) => {
    this.setState({ expanded: newState })
  }

  _handleToggle = () => {
    this.setState({ open: !this.state.open })
  }

  _handleMouseEnterMenu = () => {
    this.setState({
      hover_list: true
    })
  }

  _handleMouseLeaveMenu = () => {
    hover_list: false
  }
}

export default muiThemeable()(Toolbar)
