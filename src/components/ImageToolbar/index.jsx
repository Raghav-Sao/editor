import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'

import './Style.css'

class ImageToolbar extends Component {
  render() {
    const { connectDragSource, data, onClick } = this.props
    const content = () => {
      if (true) {
        return (
          <img
            className="img-toolbar"
            onClick={onClick}
            key={data.id}
            src={data.src}
            style={data.style}
          />
        )
      }
    }
    return connectDragSource(
      <div className="text-center" type="img">
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
const mapStateToProps = state => ({})

export default connect(mapStateToProps)(DragSource(dragType, dragSpec, dragCollect)(ImageToolbar))
