import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { actionCreator } from '../../store/actionCreator'

import './Style.css'

class TextToolbar extends Component {
  onTextToolbarClick = (e, { type, text, src, style }) => {
    style = { // Todo: make some logic
      ...style,
      left: 40,
      top: 40,
      position: 'absolute',
      width: 250,
    }
    this.props.dispatch(actionCreator.ADD_TEXT_STICKER({ text, src, style, type }))
  }
  render() {
    const { connectDragSource, data: { id, style, text, type } } = this.props

    return connectDragSource(
      <div type="text" className="text-toolbar" style={style} key={id} onClick={e => this.onTextToolbarClick(e, this.props.data)}>
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
