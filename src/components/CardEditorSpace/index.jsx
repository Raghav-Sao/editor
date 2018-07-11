import React, { Component } from 'react'
import { actionCreator } from '../../store/actionCreator'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import Style from './Style.css'
import Sticker from '../Sticker'

class CardEditorSpace extends Component {
  componentDidMount() {
    document.addEventListener('click', this.deactiveBackgroundImage)
  }

  deactiveBackgroundImage = () => {
    this.props.dispatch(
      actionCreator.UPDATE_BACKGROUND_IMAGE_STATUS({ isBackgroundImageSelected: false })
    )
  }

  aciveBackgroundImage = e => {
    this.props.dispatch(
      actionCreator.UPDATE_BACKGROUND_IMAGE_STATUS({ isBackgroundImageSelected: true })
    )
    this.props.dispatch(actionCreator.SET_ACTIVE_STICKER({ id: null }))

    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
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
    this.props.dispatch(actionCreator.ADD_TEXT_STICKER({ text, src, style, type }))
  }
  onMoveSticker = (id, position) => {
    const rootRef = findDOMNode(this)
    const { x, y } = rootRef.getBoundingClientRect()
    const style = { left: position.startX - x, top: position.startY - y }
    this.props.dispatch(actionCreator.MOVE_STICKER({ id, style }))
  }
  render() {
    const {
      backgroundImage,
      backgroundImageStyle,
      connectDropTarget,
      isBackgroundImageSelected,
      stickers,
    } = this.props
    const addedSticker = stickers.map((sticker, index) => {
      return <Sticker data={sticker} key={index} onClick={e => this.onTextToolbarClick(e)} />
    })

    return connectDropTarget(
      <div id="background__image__container" className="col-10 drop-target">
        <img
          id="card__image"
          className={`${isBackgroundImageSelected ? 'active' : ''}`}
          alt="img"
          src={backgroundImage}
          onClick={e => this.aciveBackgroundImage(e)}
          style={backgroundImageStyle}
          draggable="false"
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
const dropTypes = ['TextToolbar', 'ImageToolbar']
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
})

const mapStateToProps = ({
  imageEditor: { stickers, backgroundImage, isBackgroundImageSelected, backgroundImageStyle },
}) => ({
  stickers,
  backgroundImage,
  isBackgroundImageSelected,
  backgroundImageStyle,
})
export default connect(mapStateToProps)(
  DropTarget(dropTypes, dropSpecs, dropCollect)(CardEditorSpace)
)
