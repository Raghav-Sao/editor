import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './Style.css'

const mapStateToProps = ({ imageEditor: { showAlert } }) => ({
  showAlert,
})

class App extends Component {
  componentDidMount() {}
  render() {
    const { showAlert, dispatch } = this.props
    return (
      <div className="">
        <Button animated="fade">
          <Button.Content visible>Sign-up for a Pro account</Button.Content>
          <Button.Content hidden>$12.99 a month</Button.Content>
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
