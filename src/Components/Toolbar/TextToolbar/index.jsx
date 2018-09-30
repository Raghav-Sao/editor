import React, { Component } from 'react'
import { connect } from 'react-redux'

import './Style.css'

class TextToolbar extends Component {
  render() {
    const {
      props: { textStickers },
    } = this
    return (
      <div className="text__toolbar__container">
        {textStickers.map(({ id, style, text }, index) => (
          <div type="text" className="text__toolbar" style={style} key={id}>
            {text}
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ editorSpace: { textStickers } }) => ({ textStickers })
export default connect(mapStateToProps)(TextToolbar)
