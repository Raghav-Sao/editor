import React, { Component } from 'react'

import Sidebar from './Sidebar'
import './Style.css'

class CardEditorSpace extends Component {
  render() {
    return (
      <div className="card__editor__space__container">
        <Sidebar />
      </div>
    )
  }
}

export default CardEditorSpace
