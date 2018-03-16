import React, { Component } from 'react'

import Paper from 'material-ui/Paper'
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

import xsigma from './Template.styl'

// xsigma_templates
import Xcard from './XsigmaTemplates/Xcard'
import Xconfirm from './XsigmaTemplates/Xconfirm'
// import Xbuttonicon from './XsigmaTemplates/Xbuttonicon'

export default class Template extends Component {
  render() {
    const style = {
      margin: 12
    }

    return (
      <div>
        <div>
          CONTENT MENU
        </div>
        <div>
          <h2>Xsigma-Templates</h2>
          <h3>Cards</h3>
          <div>
            <div className='col-lg-12'>
              <div className='col-lg-4'>
                <Xcard Icon='compare_arrows' Subtitle='subtitulo' Title='Titulo' />
              </div>
              <div className='col-lg-4'>
                <Xcard Icon='settings_backup_restore' Subtitle='subtitulo' Title='Titulo' />
              </div>
              <div className='col-lg-4'>
                <Xcard Icon='settings_applications' Subtitle='subtitulo' Title='Titulo' />
              </div>
              <div>
                <Xconfirm action='delete' mantenimiento='Tipo de Proyectos' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
