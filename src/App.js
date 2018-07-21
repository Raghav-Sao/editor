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
// import Alert from './components/Alert';
// import { Button } from 'reactstrap';


const mapStateToProps = ({ imageEditor: { showAlert } }) => ({
  showAlert,
})
class App extends Component {
  dismissAlert = () => {
    this.props.dispatch(dismissAlert())
  }
  render() {
    const { showAlert, dispatch } = this.props
    return (
      <div className="row h-100">
        <Header />
        <Sidebar />
        <TextEditorTool className="text-editor-tool" />
        {/* <div className="text-center m-t-60 card__editor__space">
              <CardEditorSpace />
               <Exp />
              </div>***/}
        <div className="m-t-60 card__editor__space">
          <Exp />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
