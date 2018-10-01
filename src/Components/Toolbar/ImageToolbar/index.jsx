import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { Image } from 'semantic-ui-react'
import SVG from 'react-inlinesvg'

import './Style.css'

class ImageToolbar extends Component {
  render() {
    const {
      props: {
        connectDragSource,
        sticker: { id, style, src, type },
        index,
      },
    } = this

    return connectDragSource(
      <div className="image__toolbar">
        <SVG src={src}>
          <Image src={src} />
        </SVG>
      </div>
    )
  }
}

const dragType = 'ImageToolbar'
const dragSpec = {
  beginDrag(
    {
      sticker: { id, style, src, type },
    },
    monitor,
    component
  ) {
    return { id, style, src, type }
  },
}
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})
const mapStateToProps = ({ editorSpace: { imageStickers } }) => ({ imageStickers })
export default connect(mapStateToProps)(DragSource(dragType, dragSpec, dragCollect)(ImageToolbar))
