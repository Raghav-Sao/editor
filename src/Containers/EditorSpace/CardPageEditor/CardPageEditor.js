import React, { Component, Fragment, createRef } from 'react'
import { actionCreator } from 'store/actionCreator'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import './CardPageEditor.css';

class CardPageEditor extends Component {
  cardRef = React.createRef()
  componentDidMount() {
  }

  onAddSticker = ({ position, src, style, text, type, cardIndex }) => {
    const rootRef = findDOMNode(this)
    const { x, y } = rootRef.getBoundingClientRect()
    const sticker = {
        tempId: Date.now(),
        type,
        resource: src || text,
        styles: {
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
          // height: 'auto', think about this
          textAlign: 'center',
        },
        boundingRect: {
          top: window.scrollY + position.startY - 20,
        },
      },
      {
        props: {
          card: { _id },
        },
      } = this
    // style = type === 'text' ? { ...style, color: '#000', textAlign: 'center' } : style
    this.props.dispatch(actionCreator.ADD_TEXT_STICKER({ sticker, cardIndex, _id }))
  }

  onMoveSticker = (_id, position) => {
    //@todo: i think its not used
    const rootRef = findDOMNode(this)
    const { x, y } = rootRef.getBoundingClientRect()
    const styles = { left: position.startX - x, top: position.startY - y }
    this.props.dispatch(actionCreator.MOVE_STICKER({ _id, styles }))
  }

  setActiveMiddel = cardIndex => {
    if (!this.props.activeSticker._id || this.props.activeSticker.cardIndex !== cardIndex)
      return [false, false, false, false, false]
    let showBorderGuid = false,
      showTopGuide = false,
      showLeftGuide = false,
      showCardVerticalMiddleGuide = false,
      showCardHorizontalMiddleGuide = false
    const {
      props: {
        activeCardIndex,
        activeSticker: {
          _id: activeId,
          boundingRect: {
            left: activeLeft,
            top: activeTop,
            bottom: activeBottom,
            right: activeRight,
            width: activeWidth,
            height: activeHeight,
          } = {},
          styles: {
            translate: { translateX: activeTraslateX, translateY: activeTraslateY } = {},
          } = {},
        },
        card: {
          background: {
            boundingRect: {
              left: cardLeft = 0,
              right: cardRight = 0,
              top: cardTop = 0,
              bottom: cardBottom = 0,
              height: cardHeight = 0,
              width: cardWidth = 0,
            },
          },
        },
      },
    } = this
    if (cardWidth / 2 === activeWidth / 2 + activeLeft) {
      //add scrollX while saving only
      showCardVerticalMiddleGuide = true
    }
    if (cardHeight / 2 === activeHeight / 2 + activeTop) {
      showCardHorizontalMiddleGuide = true
    }
    const leftBorderDiff = Math.abs(10 - activeLeft).toFixed(1)
    const rightBorderDiff = Math.abs(cardRight - cardLeft - 10 - activeRight).toFixed(1)
    const topBorderDiff = Math.abs(10 - activeTop).toFixed(1)
    const bottomBorderDiff = Math.abs(cardHeight - 10 - activeBottom).toFixed(1)
    if (
      leftBorderDiff <= 1 ||
      rightBorderDiff <= 1 ||
      topBorderDiff <= 1 ||
      bottomBorderDiff <= 1
    ) {
      showBorderGuid = true
    }

    this.props.card.stickers.forEach(
      (
        {
          _id,
          styles: {
            translate: { translateX, translateY } = {},
            position: { left: absLeft },
          },
          boundingRect: { top, left, width } = {},
        },
        index
      ) => {
        if (_id !== activeId && top === activeTop) {
          showTopGuide = true
        }
        if (_id !== activeId && left === activeLeft) {
          showLeftGuide = true
        }
      }
    )
    return [
      showBorderGuid,
      showLeftGuide,
      showTopGuide,
      showCardVerticalMiddleGuide,
      showCardHorizontalMiddleGuide,
    ]
  }

  handleImageLoad = () => {
    const {
        props: { cardIndex, dispatch },
        cardRef: { current },
      } = this,
      { height, width, left, top, bottom, right } = current.getBoundingClientRect(),
      boundingRect = {
        bottom: bottom + window.scrollY,
        left: left + window.scrollX,
        right: right + window.scrollX,
        top: top + window.scrollY,
        width,
        height,
      }
    dispatch(
      actionCreator.SET_BACKGROUND_IMAGE_STYLE({
        cardIndex,
        height,
        width,
        boundingRect,
      })
    )
  }

  getImageStyle = ({ height, width } = {}) => ({ height, width }) //checkwhy

  render() {
    const {
        props: {
          acivedBackgroundImage,
          connectDropTarget,
          cardIndex,
          getStickers,
          isBackgroundImageSelected = false,
          card: {
            background: { styles, value: src, type },
            stickers,
            placeholder,
          },
          activeSticker: {
            styles: {
              position: { left: activeLeft, top: activeTop } = {},
              translate: { translateX, translateY } = {},
            } = {},
            boundingRect: { top = 0, left = 0, width = 0 } = {},
          },
        },
      } = this,
      [
        showBorderGuid,
        showLeftGuide,
        showTopGuide,
        showCardVerticalMiddleGuide,
        showCardHorizontalMiddleGuide,
      ] = this.setActiveMiddel(this.props.cardIndex),
      cardRect = this.cardRef.current ? this.cardRef.current.getBoundingClientRect() : {},
      alignTop = showTopGuide && this.cardRef.current ? top - window.scrollY : 0,
      alignLeft = showLeftGuide && this.cardRef.current ? left - window.scrollX : 0,
      cardWidth = this.cardRef.current ? cardRect.width : 0

    return (
      <Fragment>
        {connectDropTarget(
          <div className="template_container" key="cardIndex" id="iii">
            <img
              id="card__image"
              className={`${isBackgroundImageSelected ? 'active' : ''}`}
              alt="img"
              src={src}
              onClick={e => acivedBackgroundImage(e, cardIndex)}
              style={this.getImageStyle(styles)}
              draggable="false"
              width="100%"
              ref={this.cardRef}
              onLoad={this.handleImageLoad}
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
              {showCardVerticalMiddleGuide && (
                <div
                  className="align__card__center__guide"
                  style={{
                    left: cardWidth / 2,
                  }}
                />
              )}
              {showCardHorizontalMiddleGuide && (
                <div
                  className="align__card__verical_center__guide"
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
    const { _id, src, styles, text, type } = monitor.getItem()
    const { x: clientX, y: clientY } = monitor.getClientOffset()
    const { x: sourceX, y: sourceY } = monitor.getInitialSourceClientOffset()
    const { x: initialClientX, y: initialClientY } = monitor.getInitialClientOffset()
    const startX = clientX - initialClientX + sourceX
    const startY = clientY - initialClientY + sourceY
    const position = { startX, startY }
    if (type) {
      component.onAddSticker({ position, src, styles, text, type, cardIndex: props.cardIndex })
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

export default DropTarget(dropTypes, dropSpecs, dropCollect)(CardPageEditor)
