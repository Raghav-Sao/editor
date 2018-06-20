import React, { Component } from 'react'
import { actionCreator } from '../../store/actionCreator'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import Style from './Style.css'
import Sticker from '../Sticker'

class CardEditorSpace extends Component {
  onAddSticker = ({ position, src, style, text, type }) => {
    const rootRef = findDOMNode(this)
    const { x, y } = rootRef.getBoundingClientRect()
    style = {
      ...style,
      left: position.startX - x,
      top: position.startY - y,
      position: 'absolute',
      width: 250,
    }
    this.props.dispatch(actionCreator.ADD_TEXT_STICKER({ text, src, style }))
  }
  onMoveSticker = (id, position) => {
    const rootRef = findDOMNode(this)
    const { x, y } = rootRef.getBoundingClientRect()
    const style = { left: position.startX - x, top: position.startY - y }
    this.props.dispatch(actionCreator.MOVE_STICKER({ id, style }))
  }
  render() {
    const { connectDropTarget, textStickers } = this.props
    const addedSticker = textStickers.map(sticker => {
      return <Sticker data={sticker} onClick={e => this.onTextToolbarClick(e)} />
    })

    return connectDropTarget(
      <div id="c" className="drop-target">
        <img
          alt="img"
          src="http://www.couponsaregreat.net/wp-content/uploads/2012/07/treat-two-hearts-wedding-card.png"
          onClick={this.onDrop}
        />
        {addedSticker}
      </div>
    )
  }
}

const dropSpecs = {
  drop(props, monitor, component) {
    const { id, src, style, text, type } = monitor.getItem()
    const { x: clientX, y: clientY } = monitor.getClientOffset()
    const { x: sourceX, y: sourceY } = monitor.getInitialSourceClientOffset()
    const { x: initialClientX, y: initialClientY } = monitor.getInitialClientOffset()
    console.log(sourceX, initialClientX, clientX)
    const startX = clientX - initialClientX + sourceX
    const startY = clientY - initialClientY + sourceY
    const position = { startX, startY }
    if (type) {
      component.onAddSticker({ position, src, style, text, type })
    } else {
      component.onMoveSticker(id, position)
    }
    return { name: 'Content' }
  },
}
const dropTypes = ['TextToolbar', 'ImageToolbar', 'Sticker']
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
})

const mapStateToProps = state => ({
  textStickers: state.imageEditor.stickers,
})
export default connect(mapStateToProps)(
  DropTarget(dropTypes, dropSpecs, dropCollect)(CardEditorSpace)
)
