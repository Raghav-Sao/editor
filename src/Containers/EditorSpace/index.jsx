import React, { Component, Fragment } from 'react'
import { Grid } from 'semantic-ui-react'

import Sidebar from './Sidebar'
import Templates from './Templates'
import EditorToolbar from './EditorToolbar'
import './Style.css'

class EditorSpace extends Component {
  render() {
    return (
      <Fragment>
        <Grid className="editor__space__container" columns={3} centered>
          <Grid.Row>
            <Grid.Column width={4} className="sidebar__container">
              <Sidebar />
            </Grid.Column>
            <Grid.Column width={12}>
              <Templates />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <EditorToolbar />
      </Fragment>
    )
  }
}

export default EditorSpace
