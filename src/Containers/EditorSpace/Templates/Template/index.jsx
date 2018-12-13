import React, { Component, Fragment, createRef } from 'react'
import { actionCreator } from 'store/actionCreator'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import './Style.css'

class Template extends Component {
  cardRef = React.createRef()
  componentDidMount() {
    // document.addEventListener('click', () => this.deactiveBackgroundImage(this.props.index)) //add new fn for both deactivation sticker and card
    const {
        props: { cardIndex, dispatch },
        cardRef: { current },
      } = this,
      { height, width, left, top } = current.getBoundingClientRect()
    dispatch(actionCreator.SET_BACKGROUND_IMAGE_STYLE({ cardIndex, height, width, left, top }))
  }

  // deactiveBackgroundImage = cardIndex => {
  //   this.props.dispatch(
  //     actionCreator.UPDATE_BACKGROUND_IMAGE_STATUS({ isBackgroundImageSelected: false, cardIndex })
  //   )
  // }

  onAddSticker = ({ position, src, style, text, type, cardIndex }) => {
    const rootRef = findDOMNode(this)
    const { x, y } = rootRef.getBoundingClientRect()
    const sticker = {
      type,
      resource: src || text,
      style: {
        position: {
          left: position.startX - x - 20,
          top: position.startY - y - 20,
        },
        scale: 1,
        rotation: {
          unit: 'deg',
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
        boundingRect: {
          top: window.scrollY + position.startY - 20,
        },
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

  setActiveMiddel = () => {
    if (!this.props.activeSticker.id) return [false, false]
    let showBorderGuid = false,
      showTopGuide = false,
      showLeftGuide = false,
      showCardMiddleGuide = false
    const {
        props: {
          activeSticker: {
            id: activeId,
            style: {
              boundingRect: {
                left: activeLeft,
                top: activeTop,
                width: activeWidth,
                right: activeRight,
              } = {},
              translate: { translateX: activeTraslateX, translateY: activeTraslateY } = {},
            } = {},
          },
        },
      } = this,
      {
        left: cardLeft = 0,
        right: cardRight = 0,
        height = 0,
        width: cardWidth = 0,
      } = this.cardRef.current.getBoundingClientRect()
    if (activeLeft + activeWidth / 2 === cardLeft + window.scrollX + cardWidth / 2) {
      //add scrollX while saving only
      showCardMiddleGuide = true
    }
    const leftBorderDiff = Math.abs(cardLeft + 10 - activeLeft).toFixed(1)
    const rightBorderDiff = Math.abs(cardRight - 10 - activeLeft - activeWidth).toFixed(1)
    if (leftBorderDiff <= 1 || rightBorderDiff <= 1) {
      showBorderGuid = true
    }

    this.props.card.stickers.forEach(
      (
        {
          id,
          style: {
            boundingRect: { top, left, width },
            translate: { translateX, translateY },
            position: { left: absLeft },
          },
        },
        index
      ) => {
        if (id !== activeId && top === activeTop) {
          showTopGuide = true
        }
        if (id !== activeId && left === activeLeft) {
          showLeftGuide = true
        }
      }
    )
    return [showBorderGuid, showLeftGuide, showTopGuide, showCardMiddleGuide]
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
              boundingRect: { top = 0, left = 0, width = 0 } = {},
            } = {},
          },
        },
      } = this,
      [showBorderGuid, showLeftGuide, showTopGuide, showCardMiddleGuide] = this.setActiveMiddel(),
      cardRect = this.cardRef.current ? this.cardRef.current.getBoundingClientRect() : {},
      alignTop = showTopGuide && this.cardRef.current ? top - cardRect.top - window.scrollY : 0,
      alignLeft = showLeftGuide && this.cardRef.current ? left - cardRect.left - window.scrollX : 0,
      cardWidth = this.cardRef.current ? cardRect.width : 0

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
              ref={this.cardRef}
            />
            {showBorderGuid && <div className="card__border" />}
            {getStickers({ stickers, cardIndex, card: this.props.card })}
            <Fragment>
              {showLeftGuide && (
                <div
                  className="align__left__guide"
                  style={{
                    left: alignLeft,
                  }}
                />
              )}
              {showTopGuide && (
                <div
                  className="align__top__guide"
                  style={{
                    top: alignTop,
                  }}
                />
              )}
              {false && (
                <div
                  className="align__center__guide"
                  style={{
                    top: activeTop + 30,
                    transform: `translate(0px, ${translateY}px)`,
                  }}
                />
              )}
              {false && (
                <div
                  className="align__bottom__guide"
                  style={{
                    top: activeTop + 60,
                    transform: `translate(0px, ${translateY}px)`,
                  }}
                />
              )}
              {showCardMiddleGuide && (
                <div
                  className="align__card__center__guide"
                  style={{
                    left: cardWidth / 2,
                  }}
                />
              )}
            </Fragment>
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
