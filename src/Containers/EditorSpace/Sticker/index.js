import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types'; 

import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { fromEvent, merge } from 'rxjs'
import { distinctUntilChanged, map, takeUntil, tap, throttleTime } from 'rxjs/operators'
import { Image } from 'semantic-ui-react'
// import { actionCreator } from 'store/actionCreator'

import './Sticker.css';

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

  resizeOrRotate = (params) => {
    const { mouseX, mouseY, type, e, startX, startY, lastOffsetX, lastOffsetY } = params;
    e.stopPropagation();
    const sticker = this.stickerRef.current
    if (this.stickerRef === null) 
      return;
    const {
      bottom,
      left,
      top,
      right,
      width,
      height,
      left: activeBoundingLeft,
      top: activeBoundingTop,
    } = sticker.getBoundingClientRect()
 
    const { offsetWidth } = sticker
    const {
      stickerData: {
        styles: {
          rotation: { rotation },
        },
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
        const rad = rotation ? rotation : 0;
        let y = (mouseY - t) * (mouseY - t);
        let x = (mouseX - l) * (mouseX - l);
        let slop = Math.atan((mouseY - t) / (mouseX - l));
        let diff = Math.sqrt(x + y);
        diff = diff * Math.cos(slop - (rad * Math.PI) / 180) * (mouseX > l ? 1 : -1);
        if (isNaN(diff)) {
          return { width, left, diff: 0, leftDiff: 0, topDiff: 0 };
        }
        diff = type === 'leftResize' ? -diff : diff;
        if (diff + offsetWidth < 2) {
          // coz rotated getBoundingClientRect may be differ
          diff = 20 - offsetWidth;
        }
        const extraLeftDiff = type === 'leftResize' ? diff * Math.cos((rad * Math.PI) / 180) : 0;
        const extraTopDiff = type === 'leftResize' ? diff * Math.sin((rad * Math.PI) / 180) : 0;
        let leftDiff = diff / 2 - (Math.cos((rad * Math.PI) / 180) * diff) / 2 + extraLeftDiff;
        let topDiff = (Math.sin((rad * Math.PI) / 180) * diff) / 2 - extraTopDiff;

        const beforeHeight = this.stickerRef.current.offsetHeight;
        this.stickerRef.current.style.width = this.stickerRef.current.offsetWidth + diff + 'px';
        this.stickerRef.current.style.left = this.stickerRef.current.offsetLeft - leftDiff;
        this.stickerRef.current.style.top = this.stickerRef.current.offsetTop + topDiff;
        const afterHeight = this.stickerRef.current.offsetHeight;
        const heightDiff = afterHeight - beforeHeight;
        if (heightDiff !== 0) {
          const extratDiff = (heightDiff / 2) * Math.cos((rad * Math.PI) / 180) - heightDiff / 2;
          const extralDiff = (heightDiff / 2) * Math.sin((rad * Math.PI) / 180);
          leftDiff += extralDiff;
          topDiff += extratDiff;
        }
        return { diff, leftDiff, offsetWidth, topDiff, bottom, top, right, width };
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
        const transX = pageX - startX,
        transY = pageY - startY;
        return {
          translateX: transX,
          translateY: transY,
          bottom: activeBoundingTop,
          top: activeBoundingTop,
          left: activeBoundingLeft,
          right: activeBoundingLeft,
          width,
        };
      }
    }
  }

  stopEvents = ({ state }) => {
    // Todo: Make it better
    const {
      state: { isDragging, isResizing, isRotating },
    } = this
    if (isDragging || isResizing || isRotating) {
      // this.saveChanges(state)
      // this.props.dispatch(actionCreator.SAVE_EDITOR_CARD_TO_SERVER({ card }))
    }
    this.setState({ isDragging: false, isResizing: false, isRotating: false })
  }


  onResizeOrRotate = (e, type, styles = {}, state) => {
    if (this.stickerRef === null) return; //why??

    // Todo: make some name for other e
    this.setState({ isRotatedRecently: true }); //why?? r we using
    const sticker = this.stickerRef.current;
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation() //why
    const { translate: { translateX: lastOffsetX, translateY: lastOffsetY } = {} } = styles
    const pageX = e.pageX || e.touches[0].pageX,
      pageY = e.pageY || e.touches[0].pageY
    const startX = pageX - lastOffsetX,
      startY = pageY - lastOffsetY;

      console.log(pageX);
    const resizeOrRotate$ = merge(
      fromEvent(document, 'touchmove'),
      fromEvent(document, 'mousemove')
    ).pipe(
      takeUntil(
        stopEvents$.pipe(
          tap(() => {
            this.m = NaN; 
            this.stopEvents({ state })
          })
        )
      ),
      throttleTime(100),
      map(e => {
        const temp = {
        mouseX: e.touches ? e.touches[0].pageX : e.clientX,
        mouseY: e.touches ? e.touches[0].pageY : e.clientY,
        type,
        e,
        startX,
        startY,
        lastOffsetX,
        lastOffsetY,
      };
      return temp;
    }),
      map(this.resizeOrRotate),
      distinctUntilChanged()
    );
    const resizeS = resizeOrRotate$.subscribe(calculatedStyle => {
      // this.resizeOrRotateSticker(this.props.stickerData._id, calculatedStyle, type)
    });
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
    const {
      target: { innerText },
    } = event
    this.setState({ text: innerText }, this.placeCaretAtEnd.bind(null, event.target)) //think about this
    // this.props.dispatch(actionCreator.ON_INPUT_TEXT_CHANGE({ innerText }))
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

  onSelect = ()=> {
    if (!this.state.isActive) {
      this.setState({isActive : true});
      this.props.onStickerActivity('SELECT', this.props.stickerData);
    }
  }

  render() {
    const data = this.props.stickerData;
    const isStickerActive = this.state.isActive;
    const isEditable =
      isStickerActive && !this.state.isRotating && !this.state.isDragging && !this.state.isResizing;
    const sticker = () => {
      if (data.type === 'text') {
        return (
          <div
            className={`sticker__text ${isEditable ? 'editable' : ''}`}
            contentEditable={isEditable}
            suppressContentEditableWarning
            onInput={this.onInputChange}
            spellCheck={false}
          >
            {data.resource}
          </div>
        )
      }

      return (
        <div key={data._id} className={`sticker__image ${isEditable ? 'editable' : ''}`}>
          <div dangerouslySetInnerHTML={{ __html: data.resource }} key={data._id} />
        </div>
      )
    }



    return (
      <div
        className={`sticker ${isStickerActive ? 'active' : ''}`}
        style={this.getStyle(data.styles)}
        key={data._id}
        onClick={this.onSelect}
        onMouseDown={e =>
          this.onResizeOrRotate(e, 'drag', data.styles)
        } // Todo: use id from key and make better for isRotating true event
        onTouchStart={e =>
          this.onResizeOrRotate(e, 'drag', data.styles)
        }
        ref={this.stickerRef}
      >
        {sticker()}
        <div
          className="h-l"
          onMouseDown={e =>
            this.onResizeOrRotate(e, 'leftResize', data.styles)
          }
          onTouchStart={e =>
            this.onResizeOrRotate(e, 'leftResize', data.styles)
          }
        >
          <span id="handle-left" />
        </div>
        <div
          className="h-r"
          onMouseDown={e =>
            this.onResizeOrRotate(e, 'rightResize', data.styles)
          }
          onTouchStart={e =>
            this.onResizeOrRotate(e, 'rightResize', data.styles)
          }
        >
          <span id="handle-right" />
        </div>
        <div
          className="handle rotate"
          onMouseDown={e =>
            this.onResizeOrRotate(e, 'rotate', data.styles)
          }
          onTouchStart={e =>
            this.onResizeOrRotate(e, 'rotate', data.styles)
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




Sticker.propTypes = {
    data: PropTypes.object,
    onResize: PropTypes.function,
    onMove: PropTypes.function,
    onDelete: PropTypes.onDelete,
    onEdit: PropTypes.onEdit,
    isActive: PropTypes.boolean,
    readOnly: PropTypes.boolean,
}

export default DragSource(dragType, dragSpec, dragCollect)(Sticker)
