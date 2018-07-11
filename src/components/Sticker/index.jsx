import React, { createRef, Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { fromEvent, merge } from 'rxjs'
import { distinctUntilChanged, map, takeUntil, tap, throttleTime } from 'rxjs/operators'
import { actionCreator } from '../../store/actionCreator'

import Style from './Style.css'

const stopEvents$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'mouseup'))

class Sticker extends Component {
  stickerRef = createRef()
  state = { // Todo: make it in state if make sence
    isRotating: false,
    isDragging: false,
    isResizing: false,
  }
  componentDidMount() {
    document.addEventListener('click', this.deactiveSticker)
  }

  activeSticker = (e, id) => {
    this.props.dispatch(
      actionCreator.UPDATE_BACKGROUND_IMAGE_STATUS({ isBackgroundImageSelected: false })
    )
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.props.dispatch(actionCreator.SET_ACTIVE_STICKER({ id }))
  }

  deactiveSticker = () => {
    if(this.state.isRotatedRecently) { // Todo: why without setting false its working??
      return
    }
    this.props.dispatch(actionCreator.SET_ACTIVE_STICKER({ id: null }))
  }

  resizeOrRotateSticker = (id, calculatedStyle, type) => {
    const { data: {style: { transform }}} = this.props
    if (type === 'rotate') {
      const trans = transform ? transform.split('translate(')[1].split(')')[0] : 0
      const transX = trans ? parseFloat(trans.split('px')[0]) : 0
      const transY = trans ? parseFloat(trans.split('px, ')[1].split('px')[0]) : 0
      const { rads } = calculatedStyle
      const transformRes = `translate(${transX}px, ${transY}px) rotate(${-rads}rad) `
      this.props.dispatch(actionCreator.ROTATE_STICKER({ id, transform: transformRes }))
    }  else if( type === 'drag') {
        const { translateX, translateY } = calculatedStyle
        const rad = transform ? parseFloat(transform.split('rotate(')[1].split('rad')[0]) : 0
        const style = {transform: `translate(${translateX}px, ${translateY}px) rotate(${rad}rad)`}
        this.props.dispatch(actionCreator.MOVE_STICKER({ id, style }))
    } else {
      const { diff, leftDiff, offsetWidth, topDiff } = calculatedStyle
      if (diff < 0 && offsetWidth <= 2) return
      this.props.dispatch(
        actionCreator.RESIZE_STICKER({ id, diff, leftDiff, topDiff })
      )
    }
  }

  resizeOrRotate = ({ mouseX, mouseY, type, e, startX, startY }) => {
    const sticker = this.stickerRef.current
    const { left, top, right, width, height } = sticker.getBoundingClientRect()
    const { offsetWidth } = sticker
    const { data: { style: { transform } } } = this.props

    switch (type) {
      case 'leftResize':
      case 'rightResize': {
        this.setState({isResizing: true})
        const { left: l, top: t } = type === 'rightResize'
          ? document.querySelector('.sticker.active #handle-right').getBoundingClientRect()
          : document.querySelector('.sticker.active #handle-left').getBoundingClientRect()
        const rad = transform ? parseFloat(transform.split('rotate(')[1].split('rad')[0]) : 0
        let y = (mouseY - t) * (mouseY - t)
        let x = (mouseX - l) * (mouseX - l)
        let slop = Math.atan((mouseY-t)/(mouseX-l))
        let diff = x + y > 0 ? Math.sqrt(x + y) : -1 * Math.sqrt(-1 * (x + y))
        diff = diff * Math.cos(slop-rad) * ((mouseX  > l) ? 1 : -1)
        if (isNaN(diff)) {
          console.log(x, y)
          debugger
          alert('check kr bhai')
          return { width, left, diff: 0, leftDiff: 0, topDiff: 0 }
        }
        diff = type === 'leftResize' ? -diff : diff
        if(diff+offsetWidth < 2){ // coz rotated getBoundingClientRect may be differ
          diff = 2-offsetWidth
        }
        const extraLeftDiff = type === 'leftResize' ? (diff * Math.cos(rad)) : 0
        const extraTopDiff = type === 'leftResize' ? (diff * Math.sin(rad)) : 0
        const leftDiff = diff / 2 - Math.cos(rad) * diff / 2 + extraLeftDiff
        const topDiff = Math.sin(rad) * diff / 2 - extraTopDiff
        return { diff, leftDiff, offsetWidth, topDiff }
      }

      case 'rotate': {
        this.setState({isRotating: true})
        const centerX = left + width / 2
        const centerY = top + height / 2
        console.log(left, top)
        const base = mouseX - centerX
        const hypotenuse = mouseY - centerY
        return { rads: Math.atan2(base, hypotenuse) }
      }

      case 'drag': {
        if(this.state.isRotating) return
        this.setState({isDragging: true})
        const newDx = e.pageX - startX,
            newDy = e.pageY - startY;
        sticker.dataset.lastTransform = JSON.stringify({lastOffsetX: newDx, lastOffsetY: newDy });
        console.log(sticker.dataset.lastTransform)
        return  { translateX: newDx, translateY: newDy}
      }
    }
  }

  stopEvents = (type) => { // Todo: Make it better
    this.setState({isResizing: false, isRotating: false, isDragging: false})
  }

  onResizeOrRotate = (e, type) => { // Todo: make some name for other e
    this.setState({isRotatedRecently: true});
    const sticker = this.stickerRef.current
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    const { dataset: { lastTransform = JSON.stringify({}) }} = sticker
    const { lastOffsetX = 0, lastOffsetY = 0 } = JSON.parse(lastTransform)
    var startX = e.pageX - lastOffsetX, startY = e.pageY - lastOffsetY;
    this.resizeOrRotate$ = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'touchmove')
    ).pipe(
      takeUntil(
        stopEvents$.pipe(
          tap(() => {
            this.m = NaN
            this.stopEvents(type)
          })
        )
      ),
      throttleTime(100),
      map(e => ({
        mouseX: e.touches ? e.touches[0].pageX : e.pageX,
        mouseY: e.touches ? e.touches[0].pageY : e.pageY,
        type,
        e,
        startX,
        startY,
      })),
      map(this.resizeOrRotate),
      distinctUntilChanged()
    )
    this.resizeS = this.resizeOrRotate$.subscribe(calculatedStyle =>
      this.resizeOrRotateSticker(this.props.data.id, calculatedStyle, type)
    )
  }

  render() {
    const { connectDragSource, data: { id, style, text, src }, activeSticker } = this.props
    const isStickerActive = activeSticker.id == id
    const isEditable = isStickerActive && !this.state.isRotating && !this.state.isDragging && !this.state.isResizing
    const sticker = i => {
      if (!src) {
        return (
          <div
            key={id}
            className={`sticker__text ${isEditable ? 'editable' : ''}`}
            ref={this.stickerRef}
            contentEditable={isEditable}
            suppressContentEditableWarning
          >
            {text}
          </div>
        )
      }
      const imgStyle = { width: '100%' }
      return <img ref={this.stickerRef} src={src} key={id} style={imgStyle} />
    }
    return (
      <div
        className={`sticker text-toolbar ${activeSticker.id === id ? 'active' : ''}`}
        style={style}
        key={id}
        onClick={e => this.activeSticker(e, id)}
        onMouseDown={e => this.onResizeOrRotate(e, 'drag')} // Todo: use id from key and make better for isRotating true event
      >
        {sticker(1)}
        <div className="h-l" onMouseDown={e => this.onResizeOrRotate(e, 'leftResize')}>
          <span id="handle-left" />
        </div>
        <div className="h-r" onMouseDown={e => this.onResizeOrRotate(e, 'rightResize')}>
          <span id="handle-right" />
        </div>
        <div className="handle rotate" onMouseDown={e => this.onResizeOrRotate(e, 'rotate')} />
      </div>
    )
  }
}

const dragType = 'Sticker'
const dragSpec = {
  beginDrag({ data: { id, type, text, style } }, monitor, component) {
    return { id, style, type, text }
  },
}
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

const mapStateToProps = ({ imageEditor: { stickers, activeSticker } }) => ({
  stickers,
  activeSticker,
})
export default connect(mapStateToProps)(DragSource(dragType, dragSpec, dragCollect)(Sticker))
