import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'

import './Style.css'

class ImageToolbar extends Component {
  render() {
    const { connectDragSource, data, onClick } = this.props
    const content = () => {
      return (
        <div className="img-toolbar" dangerouslySetInnerHTML={{__html: data.src }} key={data.id} style={data.style}/>
      )
    }
    return connectDragSource(
      <div className="sidebar__image text-center" type="img">
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
