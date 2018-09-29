import React, { Component } from 'react'
import { connect } from 'react-redux'
import './oldApp.css'
import Header from './oldComponents/Header'
import Sidebar from './oldComponents/Sidebar'
import CardEditorSpace from './oldComponents/CardEditorSpace'
import TextEditorTool from 'oldComponents/TextEditorTool'
import Style from './oldIndex.css'
import Flex from './oldFlex.css'

const mapStateToProps = ({ imageEditor: { showAlert } }) => ({
  showAlert,
})

class OldApp extends Component {
  componentDidMount() {
    !(function(a, b) {
      var c = window
      ;(c.SessionStackKey = a),
        (c[a] = c[a] || {
          t: b,
          q: [],
        })
      for (var d = ['start', 'stop', 'identify', 'getSessionId', 'log'], e = 0; e < d.length; e++)
        !(function(b) {
          c[a][b] =
            c[a][b] ||
            function() {
              c[a].q.push([b].concat([].slice.call(arguments, 0)))
            }
        })(d[e])
      var f = document.createElement('script')
      ;(f.async = 1), (f.src = 'https://cdn.sessionstack.com/sessionstack.js')
      var g = document.getElementsByTagName('script')[0]
      g.parentNode.insertBefore(f, g)
    })('SessionStack', '498d2cb405c1479ca131f6aa84eba27b')
  }
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
      </div>
    )
  }
}

export default connect(mapStateToProps)(OldApp)
