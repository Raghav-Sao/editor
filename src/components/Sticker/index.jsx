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
  state = {
    isEditable: false,
  }

  componentDidMount() {
    document.addEventListener('click', this.deactiveSticker)
  }

  activeSticker = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.setState({ isEditable: true })
  }

  deactiveSticker = () => {
    this.setState({ isEditable: false })
  }

  resizeOrRotateSticker = (id, style, type) => {
    const isLeftResize = type === 'leftResize'
    if (type === 'rotate') {
      const { rads } = style
      // const transform = `rotate(45deg)`;
      const transform = `rotate(${-rads}rad)`
      this.props.dispatch(actionCreator.ROTATE_STICKER({ id, transform }))
    } else {
      const { diff, left, width, leftDiff, topDiff } = style
      if (diff < 0 && width <= 1) return
      this.props.dispatch(
        actionCreator.RESIZE_STICKER({ id, width, left, diff, isLeftResize, leftDiff, topDiff })
      )
    }
  }

  onRotateSticker = (id, { width, left, diff }, isLeftResize, type) => {
    if (diff < 0 && width <= 1) return
    this.props.dispatch(actionCreator.RESIZE_STICKER({ id, width, left, diff, isLeftResize }))
  }

  resizeOrRotate = ({ mouseX, mouseY, type }) => {
    const image = this.stickerRef.current
    const { left, top, right, width } = image.getBoundingClientRect()

    switch (type) {
      case 'leftResize': {
        const diff = left - mouseX
        return { width, left, diff }
        break
      }
      case 'rightResize': {
        const { data: { style: { transform } } } = this.props
        const { left: l, top: t } = document
          .querySelector('.sticker.active #handle-right')
          .getBoundingClientRect()
        const rad = transform ? parseFloat(transform.split('(')[1].split('rad')[0]) : 0
        const y = 0 //(mouseY - t)*(mouseY - t); think later
        let x = (mouseX - l) * (mouseX - l)
        if (rad < 4.71239 && rad > 1.5708) {
          x = mouseX > l ? -x : x
        } else {
          x = mouseX > l ? x : -x
        }
        let diff = x + y > -0 ? Math.sqrt(x + y) : -1 * Math.sqrt(-1 * (x + y))
        if (isNaN(diff)) {
          console.log(x, y)
          debugger
          alert('check kr bhai')
          return { width, left, diff: 0, leftDiff: 0, topDiff: 0 }
        }
        const leftDiff = diff / 2 - Math.cos(rad) * diff / 2
        const topDiff = Math.sin(rad) * diff / 2
        return { width, left, diff, leftDiff, topDiff }
        break
      }
      case 'rotate': {
        const centerX = left + image.offsetWidth / 2
        const centerY = top + image.offsetHeight / 2
        console.log(left, top)
        const base = mouseX - centerX
        const hypotenuse = mouseY - centerY
        return { rads: Math.atan2(base, hypotenuse) }
        break
      }
    }
  }

  onResizeOrRotate = (e, type) => {
    this.resizeOrRotate$ = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'touchmove')
    ).pipe(
      takeUntil(
        stopEvents$.pipe(
          tap(() => {
            this.m = NaN
          })
        )
      ),
      throttleTime(100),
      map(e => ({
        mouseX: e.touches ? e.touches[0].pageX : e.pageX,
        mouseY: e.touches ? e.touches[0].pageY : e.pageY,
        type,
      })),
      map(this.resizeOrRotate),
      distinctUntilChanged()
    )
    this.resizeS = this.resizeOrRotate$.subscribe(distance =>
      this.resizeOrRotateSticker(this.props.data.id, distance, type)
    )
  }

  render() {
    const { connectDragSource, data: { id, style, text, src } } = this.props
    const sticker = i => {
      if (!src) {
        return (
          <div key={id} className="editable" ref={this.stickerRef}>
            {text}
          </div>
        )
      }
      const imgStyle = { width: '100%' }
      return <img ref={this.stickerRef} src={src} key={id} style={imgStyle} />
    }
    return (
      <div
        className={`sticker text-toolbar ${this.state.isEditable ? 'active' : ''}`}
        style={style}
        key={id}
        onClick={e => this.activeSticker(e)}
      >
        {sticker(1)}
        <div className="h-l" onMouseDown={e => this.onResizeOrRotate(e, 'leftResize')} />
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

const mapStateToProps = state => ({
  stickers: state.imageEditor.sticker,
})
export default connect(mapStateToProps)(DragSource(dragType, dragSpec, dragCollect)(Sticker))
