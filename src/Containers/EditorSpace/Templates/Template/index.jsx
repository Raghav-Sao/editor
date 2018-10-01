import React, { Component, Fragment } from 'react'
import { actionCreator } from 'store/actionCreator'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import './Style.css'

class Template extends Component {
  componentDidMount() {
    document.addEventListener('click', () => this.deactiveBackgroundImage(this.props.index))
  }

  deactiveBackgroundImage = cardIndex => {
    this.props.dispatch(
      actionCreator.UPDATE_BACKGROUND_IMAGE_STATUS({ isBackgroundImageSelected: false, cardIndex })
    )
  }

  onAddSticker = ({ position, src, style, text, type, cardIndex }) => {
    const rootRef = findDOMNode(this)
    const { x, y } = rootRef.getBoundingClientRect()
    style = {
      ...style,
      left: position.startX - x,
      top: position.startY - y,
      position: 'absolute',
      width: type === 'text' ? 250 : 150,
    }
    style = type === 'text' ? { ...style, color: '#000', textAlign: 'center' } : style
    this.props.dispatch(
      actionCreator.ADD_TEXT_STICKER({ style: { text, src, style, type }, cardIndex })
    )
  }
  onMoveSticker = (id, position) => {
    const rootRef = findDOMNode(this)
    const { x, y } = rootRef.getBoundingClientRect()
    const style = { left: position.startX - x, top: position.startY - y }
    this.props.dispatch(actionCreator.MOVE_STICKER({ id, style }))
  }

  render() {
    const {
      props: {
        connectDropTarget,
        index,
        isBackgroundImageSelected,
        backgroundImageStyle,
        stickers,
        aciveBackgroundImage,
        backgroundImage,
      },
    } = this

    return (
      <Fragment>
        {connectDropTarget(
          <div className="template_container">
            <img
              id="card__image"
              className={`${isBackgroundImageSelected ? 'active' : ''}`}
              alt="img"
              src={backgroundImage}
              onClick={e => aciveBackgroundImage(e, index)}
              style={backgroundImageStyle}
              draggable="false"
              width="100%"
            />
            {stickers}
          </div>
        )}
      </Fragment>
    )
  }
}

const dropSpecs = {
  drop(props, monitor, component) {
    const { id, src, style, text, type } = monitor.getItem()
    const { x: clientX, y: clientY } = monitor.getClientOffset()
    const { x: sourceX, y: sourceY } = monitor.getInitialSourceClientOffset()
    const { x: initialClientX, y: initialClientY } = monitor.getInitialClientOffset()
    const startX = clientX - initialClientX + sourceX
    const startY = clientY - initialClientY + sourceY
    const position = { startX, startY }
    if (type) {
      component.onAddSticker({ position, src, style, text, type, cardIndex: props.index })
    }
    return { name: 'Content' }
  },
}
const dropTypes = ['TextToolbar', 'ImageToolbar']
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
})

export default DropTarget(dropTypes, dropSpecs, dropCollect)(Template)
