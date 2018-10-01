import React, { Component } from 'react'

import Sidebar from './Sidebar'
import Templates from './Templates'
import './Style.css'

class EditorSpace extends Component {
  render() {
    return (
      <div className="editor__space__container">
        <Sidebar />
        <Templates />
      </div>
    )
  }
}

export default EditorSpace
