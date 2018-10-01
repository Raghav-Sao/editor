import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { actionCreator } from 'store/actionCreator'

import './Style.css'

class TextToolbar extends Component {
  render() {
    const {
      props: {
        connectDragSource,
        sticker: { id, style, text },
        index,
      },
    } = this

    return connectDragSource(
      <div type="text" className="text__toolbar" style={style} key={id}>
        {text}
      </div>
    )
  }
}

const dragType = 'TextToolbar'
const dragSpec = {
  beginDrag(
    {
      sticker: { id, type, text, style },
    },
    monitor,
    component
  ) {
    return { id, style, type, text }
  },
}
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})
const mapStateToProps = ({ editorSpace: { textStickers } }) => ({ textStickers })

export default connect(mapStateToProps)(DragSource(dragType, dragSpec, dragCollect)(TextToolbar))
