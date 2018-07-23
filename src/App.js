import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from './logo.svg'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CardEditorSpace from './components/CardEditorSpace'
import Exp from './components/Exp'
import TextEditorTool from 'components/TextEditorTool'
import Style from './index.css'
import Flex from './flex.css'

const mapStateToProps = ({ imageEditor: { showAlert } }) => ({
  showAlert,
})

class App extends Component {
  render() {
    const { showAlert, dispatch } = this.props
    return (
      <div className="row h-100">
        <Header />
        <Sidebar />
        <TextEditorTool className="text-editor-tool" />
        <div className="text-center m-t-60 card__editor__space">
          <CardEditorSpace />
        </div>
        <div className="m-t-60 card__editor__space">
          <CardEditorSpace />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
