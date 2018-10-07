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
    const sticker = {
      type,
      resource: 'Sample Big-Text',
      style: {
        position: {
          left: position.startX - x - 20,
          top: position.startY - y - 20,
        },
        scale: 1,
        rotation: {
          unit: 'rad',
          rotation: 0,
        },
        translate: {
          translateX: 0,
          translateY: 0,
        },
        color: '#FFF',
        fontSize: 25,
        width: type === 'text' ? 250 : 150,
        height: 'auto',
        textAlign: 'center',
      },
    }
    // style = type === 'text' ? { ...style, color: '#000', textAlign: 'center' } : style
    this.props.dispatch(actionCreator.ADD_TEXT_STICKER({ sticker, cardIndex }))
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
        acivedBackgroundImage,
        connectDropTarget,
        cardIndex,
        getStickers,
        isBackgroundImageSelected = false,
        card: {
          background: { style, value: src, type },
          stickers,
          placeholder,
        },
        activeSticker: {
          style: {
            position: { left: activeLeft, top: activeTop } = {},
            translate: { translateX, translateY } = {},
          } = {},
        },
      },
    } = this

    return (
      <Fragment>
        {connectDropTarget(
          <div className="template_container" key="cardIndex">
            <img
              id="card__image"
              className={`${isBackgroundImageSelected ? 'active' : ''}`}
              alt="img"
              src={src}
              onClick={e => acivedBackgroundImage(e, cardIndex)}
              style={style}
              draggable="false"
              width="100%"
            />
            {getStickers({ stickers, cardIndex })}
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
      component.onAddSticker({ position, src, style, text, type, cardIndex: props.cardIndex })
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