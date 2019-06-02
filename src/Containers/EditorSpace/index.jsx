import React, { Component, Fragment } from 'react'
import { Grid } from 'semantic-ui-react'
import Sidebar from './Sidebar'
import CardPageEditor from './CardPageEditor';
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
              <CardPageEditor cardId={1234} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    )
  }
}

export default EditorSpace
