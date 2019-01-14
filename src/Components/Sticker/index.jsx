import React, { createRef, Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { fromEvent, merge } from 'rxjs'
import { distinctUntilChanged, map, takeUntil, tap, throttleTime } from 'rxjs/operators'
import { Image } from 'semantic-ui-react'
import { actionCreator } from 'store/actionCreator'

import Style from './Style.css'

const stopEvents$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'mouseup'))

class Sticker extends Component {
  constructor(props) {
    super(props)
    this.stickerRef = createRef()
    this.state = {
      // Todo: make it in state if make sence
      isRotating: false,
      isDragging: false,
      isResizing: false,
    }
  }
  componentDidMount() {
    document.addEventListener('click', this.deactiveSticker)
  }

  activeSticker = (e, _id, cardIndex) => {
    this.props.dispatch(
      actionCreator.UPDATE_BACKGROUND_IMAGE_STATUS({ isBackgroundImageSelected: false })
    )
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.props.dispatch(actionCreator.SET_ACTIVE_STICKER({ _id, cardIndex }))
  }

  deactiveSticker = () => {
    if (this.state.isRotatedRecently) {
      // Todo: why without setting false its working??
      return
    }
    this.props.dispatch(actionCreator.SET_ACTIVE_STICKER({ _id: null }))
  }

  checkForReadjust = ({
    newTranslateX,
    newTranslateY,
    nextTop,
    nextLeft,
    nextBottom,
    nextRight,
  }) => {
    //@todo: can we use nextTop to get nextBottom??
    if (!this.props.activeSticker._id) return [newTranslateX, newTranslateY]
    let restranslateY = newTranslateY,
      restranslateX = newTranslateX
    const {
      props: {
        activeSticker: {
          _id: activeId,
          cardIndex,
          styles: {
            position: { left: activeAbsLeft, top: activeAbsTop },
            translate: { translateX: activeTraslateX, translateY: activeTraslateY } = {},
          } = {},
          boundingRect: { width: activeWidth, left: boundingLeft } = {}, //not taking left right from here coz it will update soon
        },
        cards: {
          [cardIndex]: {
            background: {
              boundingRect: {
                width: cardWidth,
                height: cardHeight,
                left: cardLeft,
                right: cardRight,
                bottom: cardBottom,
                top: cardTop,
              },
            },
          },
        },
      },
    } = this

    const midDiff = cardLeft + cardWidth / 2 + window.scrollX - nextLeft - activeWidth / 2
    if (Math.abs(midDiff) < 5) {
      restranslateX += midDiff
    }

    const leftDiff = Math.abs(nextLeft - cardLeft - 10)
    const rightDiff = Math.abs(cardLeft + cardWidth - 10 - nextLeft - activeWidth)
    const topDiff = Math.abs(nextTop - cardTop - 10)
    const bottomDiff = Math.abs(cardBottom - 10 - nextBottom)
    if (leftDiff <= 5) {
      restranslateX = restranslateX + Math.round(cardLeft + 10 - nextLeft)
      return [restranslateX, restranslateY]
    }
    if (rightDiff <= 5) {
      restranslateX = restranslateX + Math.round(cardLeft + cardWidth - 10 - nextLeft - activeWidth)
      return [restranslateX, restranslateY]
    }
    if (topDiff <= 5) {
      restranslateY = restranslateY + Math.round(cardTop + 10 - nextTop)
      return [restranslateX, restranslateY]
    }
    if (bottomDiff <= 5) {
      restranslateY = restranslateY + Math.round(cardBottom - 10 - nextBottom)
      return [restranslateX, restranslateY]
    }
    // const { top: activeTop, left: activeLeft } = this.stickerRef.current.getBoundingClientRect()

    const { cardRef: { current: { height = 0 } = {} } = {} } = this

    this.props.card.stickers.forEach(
      (
        {
          _id,
          styles: {
            position: { left: absLeft, top: absTop },
            translate: { translateX, translateY },
          },
          boundingRect: { top, left },
        },
        index
      ) => {
        const vDiff = Math.abs(parseInt(top - nextTop))
        const hDiff = Math.abs(parseInt(left - nextLeft))
        if (_id !== activeId && vDiff <= 5) {
          // if (id !== activeId) console.log('hi')
          // restranslateY = absTop + translateY - activeAbsTop
          restranslateY = newTranslateY + top - nextTop
        }
        if (_id !== activeId && hDiff <= 5) {
          // restranslateX =  = left + translateX - nextLeft
          restranslateX = newTranslateX + left - nextLeft
        }
      }
    )
    // console.log('------------------------')
    return [restranslateX, restranslateY]
  }

  resizeOrRotateSticker = (_id, calculatedStyle, type, cardIndex) => {
    const { bottom, top, right, left, width } = calculatedStyle
    if (type === 'rotate') {
      const { rotation } = calculatedStyle
      this.props.dispatch(
        actionCreator.ROTATE_STICKER({
          _id,
          rotation,
          cardIndex,
          boundingRect: { bottom, top: top + window.scrollY, right, left: left + window.scrollX },
        })
      )
    } else if (type === 'drag') {
      const { translateX, translateY } = calculatedStyle
      const translate = { translateX, translateY }
      // console.log(translateY, window.scrollY, top, this.stickerRef.current.getBoundingClientRect())
      this.props.dispatch(
        actionCreator.MOVE_STICKER({
          _id,
          translate,
          cardIndex,
          boundingRect: {
            bottom,
            top: top,
            right,
            left: left,
            width,
          },
        })
      )
    } else {
      const { diff, leftDiff, offsetWidth, topDiff } = calculatedStyle
      if (diff < 0 && offsetWidth <= 2) return
      this.props.dispatch(
        actionCreator.RESIZE_STICKER({
          _id,
          diff,
          leftDiff,
          topDiff,
          cardIndex,
          boundingRect: {
            bottom,
            top: top + window.scrollY,
            right,
            left: left + window.scrollX,
            width,
          },
        })
      )
    }
  }

  resizeOrRotate = ({ mouseX, mouseY, type, e, startX, startY, lastOffsetX, lastOffsetY }) => {
    e.stopPropagation()
    const sticker = this.stickerRef.current
    if (this.stickerRef === null) return
    const { bottom, left, top, right, width, height } = sticker.getBoundingClientRect()
    const { offsetWidth } = sticker
    const {
      data: {
        styles: {
          rotation: { rotation },
        },
      },
      activeSticker: {
        styles: {
          translate: { translateX: lastTraslateX = 0, translateY: lastTraslateY = 0 } = {},
        } = {},
      },
    } = this.props

    switch (type) {
      case 'leftResize':
      case 'rightResize': {
        this.setState({ isResizing: true })
        const { left: l, top: t } =
          type === 'rightResize'
            ? document.querySelector('.sticker.active #handle-right').getBoundingClientRect()
            : document.querySelector('.sticker.active #handle-left').getBoundingClientRect()
        const rad = rotation ? rotation : 0
        let y = (mouseY - t) * (mouseY - t)
        let x = (mouseX - l) * (mouseX - l)
        let slop = Math.atan((mouseY - t) / (mouseX - l))
        let diff = x + y > 0 ? Math.sqrt(x + y) : -1 * Math.sqrt(-1 * (x + y))
        diff = diff * Math.cos(slop - (rad * Math.PI) / 180) * (mouseX > l ? 1 : -1)
        if (isNaN(diff)) {
          alert('check kr bhai')
          return { width, left, diff: 0, leftDiff: 0, topDiff: 0 }
        }
        diff = type === 'leftResize' ? -diff : diff
        // console.log(diff, offsetWidth, '------>')
        if (diff + offsetWidth < 2) {
          // coz rotated getBoundingClientRect may be differ
          diff = 20 - offsetWidth
        }
        const extraLeftDiff = type === 'leftResize' ? diff * Math.cos((rad * Math.PI) / 180) : 0
        const extraTopDiff = type === 'leftResize' ? diff * Math.sin((rad * Math.PI) / 180) : 0
        let leftDiff = diff / 2 - (Math.cos((rad * Math.PI) / 180) * diff) / 2 + extraLeftDiff
        let topDiff = (Math.sin((rad * Math.PI) / 180) * diff) / 2 - extraTopDiff
        // console.log(this.stickerRef.current.offsetHeight, 'before')

        const beforeHeight = this.stickerRef.current.offsetHeight
        this.stickerRef.current.style.width = this.stickerRef.current.offsetWidth + diff + 'px'
        this.stickerRef.current.style.left = this.stickerRef.current.offsetLeft - leftDiff
        this.stickerRef.current.style.top = this.stickerRef.current.offsetTop + topDiff
        const afterHeight = this.stickerRef.current.offsetHeight
        const heightDiff = afterHeight - beforeHeight
        if (heightDiff !== 0) {
          const extratDiff = (heightDiff / 2) * Math.cos((rad * Math.PI) / 180) - heightDiff / 2
          const extralDiff = (heightDiff / 2) * Math.sin((rad * Math.PI) / 180)
          leftDiff += extralDiff
          console.log(extratDiff, 'extratDiff', extralDiff)
          topDiff += extratDiff
        }
        return { diff, leftDiff, offsetWidth, topDiff, bottom, top, right, width }
      }

      case 'rotate': {
        this.setState({ isRotating: true })
        const centerX = left + width / 2,
          centerY = top + height / 2,
          base = mouseX - centerX,
          hypotenuse = mouseY - centerY,
          deg = -Math.round((Math.atan2(base, hypotenuse) * 180) / Math.PI),
          rotation = Math.abs(deg) < 3 ? 0 : deg,
          transform = this.stickerRef.current.style.transform,
          beforeData = transform.split('rotate(')[0],
          afterData = transform.split('deg)')[1]

        this.stickerRef.current.style.transform = `${beforeData} rotate(${deg}deg) ${afterData}` //to get top after rotation before render
        // console.log(this.stickerRef.current.getBoundingClientRect(), deg)
        return {
          rotation,
          bottom,
          top: this.stickerRef.current.getBoundingClientRect().top + window.scrollY,
          right,
          left,
          width,
        }
      }

      case 'drag': {
        if (this.state.isRotating) return
        this.setState({ isDragging: true })
        const pageX = e.touches ? e.touches[0].pageX : e.pageX,
          pageY = e.touches ? e.touches[0].pageY : e.pageY
        const newDx = pageX - startX,
          newDy = pageY - startY
        const [transX, transY] = this.checkForReadjust({
          newTranslateX: newDx,
          newTranslateY: newDy,
          nextTop: top + window.scrollY + newDy - lastTraslateY,
          nextLeft: left + window.scrollX + newDx - lastTraslateX,
          nextBottom: bottom + window.scrollY + newDy - lastTraslateY,
          nextRight: left + window.scrollX + newDx - lastTraslateX,
        })
        sticker.dataset.lastTransform = JSON.stringify({ lastOffsetX: transX, lastOffsetY: transY })
        return {
          translateX: transX,
          translateY: transY,
          bottom: bottom + window.scrollY + transY - lastTraslateY,
          top: top + window.scrollY + transY - lastTraslateY,
          right: right + window.scrollX + transX - lastTraslateX,
          left: left + window.scrollX + transX - lastTraslateX,
          width,
        }
      }
    }
  }

  stopEvents = ({ state, cardIndex }) => {
    // Todo: Make it better
    const {
      state: { isDragging, isResizing, isRotating },
      props: {
        cards: { [cardIndex]: card },
      },
    } = this
    if (isDragging || isResizing || isRotating) {
      this.saveChanges(state)
      // this.props.dispatch(actionCreator.SAVE_EDITOR_CARD_TO_SERVER({ card }))
    }
    this.setState({ isDragging: false, isResizing: false, isRotating: false })
  }

  saveChanges = state => {
    const savedUndoData = JSON.parse(window.localStorage.getItem('savedUndoData') || '[]'),
      { activeSticker, cards } = state,
      newUndoState = [...savedUndoData, { activeSticker, cards }]
    window.localStorage.setItem('savedUndoData', JSON.stringify(newUndoState))
  }

  onResizeOrRotate = (e, type, cardIndex, styles = {}, state) => {
    if (this.stickerRef === null) return

    // Todo: make some name for other e
    this.setState({ isRotatedRecently: true })
    const sticker = this.stickerRef.current
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    const {
      dataset: { lastTransform = JSON.stringify({}) },
    } = sticker
    // const { lastOffsetX = 0, lastOffsetY = 0 } = JSON.parse(lastTransform)
    const { translate: { translateX: lastOffsetX, translateY: lastOffsetY } = {} } = styles
    const pageX = e.pageX || e.touches[0].pageX,
      pageY = e.pageY || e.touches[0].pageY
    var startX = pageX - lastOffsetX,
      startY = pageY - lastOffsetY
    this.resizeOrRotate$ = merge(
      fromEvent(document, 'touchmove'),
      fromEvent(document, 'mousemove')
    ).pipe(
      takeUntil(
        stopEvents$.pipe(
          tap(() => {
            this.m = NaN
            this.stopEvents({ state, cardIndex })
          })
        )
      ),
      throttleTime(100),
      map(e => ({
        mouseX: e.touches ? e.touches[0].pageX : e.clientX,
        mouseY: e.touches ? e.touches[0].pageY : e.clientY,
        type,
        e,
        startX,
        startY,
        lastOffsetX,
        lastOffsetY,
      })),
      map(this.resizeOrRotate),
      distinctUntilChanged()
    )
    this.resizeS = this.resizeOrRotate$.subscribe(calculatedStyle =>
      this.resizeOrRotateSticker(this.props.data._id, calculatedStyle, type, cardIndex)
    )
  }
  getTransformData = ({
    translate: { translateX = 0, translateY = 0 },
    rotation: { unit, rotation },
  }) => {
    // console.log(unit)
    const data = `translate(${translateX}px, ${translateY}px) rotate(${rotation}${unit})`
    return data
  }

  getStyle = ({
    color,
    fontSize,
    fontWeight,
    position: { left, top },
    width,
    height,
    textAlign = 'center',
    fontStyle,
    translate,
    rotation,
  }) => ({
    textAlign,
    fontStyle,
    color,
    fontSize,
    fontWeight,
    height,
    left,
    position: 'absolute',
    top,
    width,
    transform: this.getTransformData({ translate, rotation }),
    fill: color,
  })

  onInputChange = event => {
    console.log(event)
    // debugger
    // event.stopPropagation()
    // event.nativeEvent.stopImmediatePropagation()
    // event.preventDefault()
    // event.nativeEvent.preventDefault()
    // event.returnValue = false
    // event.cancelBubble = true
    // alert('ji')
    const {
      target: { innerText },
    } = event
    this.setState({ text: innerText }, this.placeCaretAtEnd.bind(null, event.target)) //think about this
    this.props.dispatch(actionCreator.ON_INPUT_TEXT_CHANGE({ innerText }))
    return false
  }
  placeCaretAtEnd = el => {
    if (!el) return
    el.focus()
    if (typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined') {
      var range = document.createRange()
      range.selectNodeContents(el)
      range.collapse(false)
      var sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    } else if (typeof document.body.createTextRange != 'undefined') {
      var textRange = document.body.createTextRange()
      textRange.moveToElementText(el)
      textRange.collapse(false)
      textRange.select()
    }
  }

  render() {
    const {
      connectDragSource,
      data: { _id, resource, styles, type },
      activeSticker,
      cardIndex,
      key,
      cards,
    } = this.props
    const isStickerActive = activeSticker._id == _id
    const isEditable =
      isStickerActive && !this.state.isRotating && !this.state.isDragging && !this.state.isResizing
    const sticker = () => {
      if (type === 'text') {
        //this.placeCaretAtEnd(document.getElementsByClassName('sticker__text')[0])
        return (
          <div
            key={key}
            className={`sticker__text ${isEditable ? 'editable' : ''}`}
            contentEditable={isEditable}
            suppressContentEditableWarning
            onInput={this.onInputChange}
            spellCheck={false}
          >
            {resource}
          </div>
        )
      }

      return (
        <div key={_id} className={`sticker__image ${isEditable ? 'editable' : ''}`}>
          <div dangerouslySetInnerHTML={{ __html: resource }} key={_id} />
        </div>
      )
    }
    return (
      <div
        className={`sticker ${isStickerActive ? 'active' : ''}`}
        style={this.getStyle(styles)}
        key={_id}
        onClick={e => this.activeSticker(e, _id, cardIndex)}
        onMouseDown={e =>
          this.onResizeOrRotate(e, 'drag', cardIndex, styles, { activeSticker, cards })
        } // Todo: use id from key and make better for isRotating true event
        onTouchStart={e =>
          this.onResizeOrRotate(e, 'drag', cardIndex, styles, { activeSticker, cards })
        }
        ref={this.stickerRef}
      >
        {sticker()}
        <div
          className="h-l"
          onMouseDown={e =>
            this.onResizeOrRotate(e, 'leftResize', cardIndex, styles, { activeSticker, cards })
          }
          onTouchStart={e =>
            this.onResizeOrRotate(e, 'leftResize', cardIndex, styles, { activeSticker, cards })
          }
        >
          <span id="handle-left" />
        </div>
        <div
          className="h-r"
          onMouseDown={e =>
            this.onResizeOrRotate(e, 'rightResize', cardIndex, styles, { activeSticker, cards })
          }
          onTouchStart={e =>
            this.onResizeOrRotate(e, 'rightResize', cardIndex, styles, { activeSticker, cards })
          }
        >
          <span id="handle-right" />
        </div>
        <div
          className="handle rotate"
          onMouseDown={e =>
            this.onResizeOrRotate(e, 'rotate', cardIndex, styles, { activeSticker, cards })
          }
          onTouchStart={e =>
            this.onResizeOrRotate(e, 'rotate', cardIndex, styles, { activeSticker, cards })
          }
        />
      </div>
    )
  }
}

const dragType = 'Sticker'
const dragSpec = {
  beginDrag(
    {
      data: { _id, type, text, styles },
    },
    monitor,
    component
  ) {
    return { _id, styles, type, text }
  },
}
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

const mapStateToProps = ({ editorSpace: { activeSticker, cards } }) => ({
  activeSticker,
  cards,
})
export default connect(mapStateToProps)(DragSource(dragType, dragSpec, dragCollect)(Sticker))
