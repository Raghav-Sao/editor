import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { actionCreator } from '../../store/actionCreator'

import './Style.css'

class ImageToolbar extends Component {
  onImageToolbarClick = (e, { type, text, src, style }) => {
    const left = this.props.stickers ? (this.props.stickers.length * 30) % 300 + 20 : 20
    const top = this.props.stickers ? (this.props.stickers.length * 30) % 400 + 20 : 20
    style = {
      // Todo: make some logic
      ...style,
      left,
      top,
      position: 'absolute',
      width: 150,
      color: '#000',
    }
    this.props.dispatch(actionCreator.ADD_TEXT_STICKER({ text, src, style, type }))
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  render() {
    const { connectDragSource, data: { id, src, style }, onClick } = this.props
    const content = () => {
      return (
        <div
          className="img-toolbar"
          dangerouslySetInnerHTML={{ __html: src }}
          key={id}
          style={style}
        />
      )
    }
    return connectDragSource(
      <div 
        className="sidebar__image text-center"
        type="img"
        onClick={e => {
          this.onImageToolbarClick(e, this.props. data), this.props.onClick()
        }}>
        {content()}
      </div>
    )
  }
}

const dragType = 'ImageToolbar'
const dragSpec = {
  beginDrag({ data: { id, type, src, style } }, monitor, component) {
    return { id, style, type, src }
  },
}
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})
const mapStateToProps = ({ imageEditor: { stickers }}) => ({
  stickers
})

export default connect(mapStateToProps)(DragSource(dragType, dragSpec, dragCollect)(ImageToolbar))
