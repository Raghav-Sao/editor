import React, { createRef, Component } from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { fromEvent, merge } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { actionCreator } from '../../store/actionCreator';

import Style from './Style.css';

const stopEvents$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'mouseup'));

class Sticker extends Component {
  stickerRef = createRef();
  state = {
    isEditable: false,
  };

  activeSticker = () => {
    this.setState({ isEditable: true });
  };

  componentDidMount() {}

  onResizeSticker = (id, { width, left, diff }, isLeftResize) => {
    if(diff < 0 && width <=1 ) return
    // console.log(width, trans);
    console.log(diff,' ....',width);
    this.props.dispatch(actionCreator.RESIZE_STICKER({ id, width, left, diff, isLeftResize }));
    // if (height > 0 && width > 0) {
    //   const style = { width };
    // }
  };

  resize = ({ mouseX, mouseY, isLeftResize }) => {
    const image = this.stickerRef.current;
    const { left, top, right, width } = image.getBoundingClientRect();
    const diff = isLeftResize ? left - mouseX : mouseX - right;


    // console.log("width: ", calLeft, calWidth);
    

    // const height = mouseY - top;
    // // const width = w + transform;
    // console.log("width", width - left + mouseX);


    return { width, left, diff };
  };

  onResize = (e, isLeftResize) => {
    this.resize$ = merge(fromEvent(document, 'mousemove'), fromEvent(document, 'touchmove')).pipe(
      takeUntil(
        stopEvents$.pipe(
          tap(() => {
            this.m = NaN;
          })
        )
      ),
      throttleTime(10),
      map(e => ({
        mouseX: e.touches ? e.touches[0].pageX : e.pageX,
        mouseY: e.touches ? e.touches[0].pageY : e.pageY,
        isLeftResize,
      })),
      map(this.resize),
      distinctUntilChanged()
    );
    this.resizeS = this.resize$.subscribe(distance =>
      this.onResizeSticker(this.props.data.id, distance, isLeftResize)
    );
  };

  render() {
    const { connectDragSource, data: { id, style, text, src } } = this.props;
    const sticker = i => {
      if (!src) {
        return <div ref={this.stickerRef} contenteditable="true">{text}</div>;
      }
      return <img ref={this.stickerRef} src={src} style={style} key={id} />;
    };
    return connectDragSource(
      <div
        className={`text-toolbar ${this.state.isEditable ? 'active' : ''}`}
        style={style}
        key={id}
        onClick={this.activeSticker}
      >
        {sticker(1)}
        <div className="h-l" onMouseDown={e => this.onResize(e, true)} />
        <div className="h-r" onMouseDown={e => this.onResize(e, false)} />
      </div>
    );
  }

  // rotate = ({ mouseX, mouseY }) => {
  //   const image = this.stickerRef.current;
  //   const { left, top } = image.getBoundingClientRect();
  //   const centerX = left + image.offsetWidth / 2;
  //   const centerY = top + image.offsetHeight / 2;
  //   const base = mouseX - centerX;
  //   const hypotenuse = centerY - mouseY;
  //   return Math.atan2(base, hypotenuse);
  // };

  // startRotate = e => {
  //   this.rotate$ = merge(fromEvent(document, 'mousemove'), fromEvent(document, 'touchmove')).pipe(
  //     takeUntil(stopEvents$.pipe(tap(this.stopRotate))),
  //     throttleTime(100),
  //     map(e => ({
  //       mouseX: e.touches ? e.touches[0].pageX : e.pageX,
  //       mouseY: e.touches ? e.touches[0].pageY : e.pageY,
  //     })),
  //     map(this.rotate),
  //     distinctUntilChanged()
  //   );
  //   this.rotateS = this.rotate$.subscribe(rads => this.onRotateSticker(this.props.data.id, rads));
  // };

  // onRotateSticker = (id, rads) => {
  //   const transform = `rotate(${rads}rad)`;
  //   this.props.dispatch(actionCreator.ROTATE_STICKER({ id, transform }));
  // };
}

const dragType = 'Sticker';
const dragSpec = {
  beginDrag({ data: { id, type, text, style } }, monitor, component) {
    return { id, style, type, text };
  },
};
const dragCollect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

const mapStateToProps = state => ({
  stickers: state.imageEditor.sticker,
});
export default connect(mapStateToProps)(DragSource(dragType, dragSpec, dragCollect)(Sticker));
