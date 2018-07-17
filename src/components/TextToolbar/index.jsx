import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { actionCreator } from '../../store/actionCreator'

import './Style.css'

class TextToolbar extends Component {
  onTextToolbarClick = (e, { type, text, src, style }) => {
    const left = this.props.stickers ? (this.props.stickers.length * 30) % 300 + 20 : 20
    const top = this.props.stickers ? (this.props.stickers.length * 30) % 400 + 20 : 20
    style = {
      // Todo: make some logic
      ...style,
      left,
      top,
      position: 'absolute',
      textAlign: 'center',
      width: 250,
      color: '#000',
    }
    this.props.dispatch(actionCreator.ADD_TEXT_STICKER({ text, src, style, type }))
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  render() {
    const { connectDragSource, data: { id, style, text, type } } = this.props

    return connectDragSource(
      <div
        type="text"
        className="text-toolbar"
        style={style}
        key={id}
        onClick={e => {
          this.onTextToolbarClick(e, this.props.data), this.props.onClick()
        }}
      >
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
  stickers: state.imageEditor.stickers,
})
export default connect(mapStateToProps)(DragSource(dragType, dragSpec, dragCollect)(TextToolbar))
