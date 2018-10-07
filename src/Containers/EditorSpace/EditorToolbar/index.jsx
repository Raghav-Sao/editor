import React, { Component } from 'react'
import { connect } from 'react-redux'

import EditorTextToolbar from './EditorTextToolbar'
import './Style.css'
class EditorToolbar extends Component {
  render() {
    const {
      props: {
        activeSticker: { style: activeStyle = {}, type: activeType },
      },
    } = this
    const showToolbar = activeType && typeof activeType !== 'undefined'

    return (
      <div className={`editor__toolbar__container ${showToolbar ? 'active' : ''}`}>
        <EditorTextToolbar activeSticker={this.props.activeSticker} />
      </div>
    )
  }
}

const mapStateToProps = ({ editorSpace: { activeSticker } }) => ({ activeSticker })

export default connect(mapStateToProps)(EditorToolbar)
