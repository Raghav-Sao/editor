import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'

import './Style.css'

class TextToolbar extends Component {
  render() {
    const { connectDragSource, data: { id, style, text, type } } = this.props

    return connectDragSource(
      <div type="text" class="text-toolbar" style={style} key={id}>
        {text}
      </div>
    )
  }
}

const dragType = 'TextToolbar'
const dragSpec = {
  beginDrag({ data: { id, type, text, style } }, monitor, component) {
    return { id, style, type, text }
  },
}
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

const mapStateToProps = state => ({
  stickers: state.imageEditor.textStickers,
})
export default connect(mapStateToProps)(DragSource(dragType, dragSpec, dragCollect)(TextToolbar))
