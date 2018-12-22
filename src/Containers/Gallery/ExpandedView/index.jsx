import React, { Component } from 'react'
import { Button, Grid, Header, Icon, Image, Modal, Rating } from 'semantic-ui-react'

import { fromEvent, merge } from 'rxjs'
import { distinctUntilChanged, map, takeUntil, tap, throttleTime } from 'rxjs/operators'
import './Style.css'
const stopEvents$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'mouseup'))

class ExpandedViewModel extends Component {
  state = {
    selectedImage: 0,
    style: {},
  }
  stopEvents = () => {}
  star3d = e => {
    const sticker = this.refs.front
    const { width } = this.refs.front.getBoundingClientRect()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    const pageX = e.pageX || e.touches[0].pageX,
      pageY = e.pageY || e.touches[0].pageY
    var startX = pageX,
      startY = pageY
    this.resizeOrRotate$ = merge(
      fromEvent(document, 'touchmove'),
      fromEvent(document, 'mousemove')
    ).pipe(
      takeUntil(
        stopEvents$.pipe(
          tap(() => {
            this.m = NaN
            this.stopEvents()
          })
        )
      ),
      throttleTime(100),
      map(e => ({
        mouseX: e.touches ? e.touches[0].pageX : e.pageX,
        mouseY: e.touches ? e.touches[0].pageY : e.pageY,
        e,
        startX,
        startY,
        width,
      })),
      distinctUntilChanged()
    )
    this.resizeS = this.resizeOrRotate$.subscribe(calculatedStyle =>
      this.resizeOrRotateSticker(calculatedStyle)
    )
  }
  resizeOrRotateSticker = data => {
    console.log(data, this.refs.front.getBoundingClientRect())
    const { mouseX } = data,
      { x, width } = this.refs.front.getBoundingClientRect()
    // const s = Math.min(width, mouseX)
    console.log(width)
    // const diff = 90 / 400
    // let calcTransY = 360 - diff * (x + width - mouseX)

    // calcTransY = calcTransY > 360 ? 360 : calcTransY
    // calcTransY = calcTransY < 360 ? 90 : calcTransY
    let dist = Math.min(821, 821 - mouseX)
    dist = Math.max(0, dist)
    const calcTransY = 360 - (90 / 400) * dist
    console.log(calcTransY)
    const style = {
      transform: `rotateY(${calcTransY}deg)`,
    }
    const style1 = {
      display: 'none',
      transform: `rotateY(${calcTransY}deg)`,
    }
    if (calcTransY <= 270) {
      style['visibility'] = 'hidden'
      style1['display'] = 'block'
    }
    this.setState({
      ...this.state.style,
      style,
      style1,
    })
  }
  render() {
    return (
      <Modal
        open={this.props.open}
        className="expanded_view__model"
        closeOnEscape={true}
        onClose={this.props.toggleExpandedModal}
        closeOnDimmerClick={true}
      >
        <Modal.Header>Profile Picture</Modal.Header>
        <Modal.Content image>
          <div
            className="image__container flex__container--column"
            style={{
              perspective: '2000px',
              minHeight: '500px',
              backfaceVisibility: 'hidden',
              minHeight: '283px',
              width: '100%',
            }}
          >
            <img
              src="https://i.pinimg.com/originals/ce/93/04/ce93045e2801a7544da8ef92867f2081.jpg"
              onMouseDown={e => this.star3d(e)}
              draggable="false"
              style={{
                position: 'absolute',
                left: '400px',
                transformOrigin: '0% 50% 0px',
                width: '400px',
                zIndex: 10,
                ...this.state.style,
              }}
              ref="front"
            />
            <img
              src="https://i.pinimg.com/originals/ce/93/04/ce93045e2801a7544da8ef92867f2081.jpg"
              onMouseDown={e => this.star3d(e)}
              draggable="false"
              style={{
                position: 'absolute',
                left: '400px',
                transformOrigin: '0% 50% 0px',
                width: '400px',
                border: '1px solid green',
              }}
            />
            <img
              src="https://i.pinimg.com/originals/ce/93/04/ce93045e2801a7544da8ef92867f2081.jpg"
              onMouseDown={e => this.star3d(e)}
              draggable="false"
              style={{
                position: 'absolute',
                left: '400px',
                transformOrigin: '0% 50% 0px',
                width: '400px',
                border: '2px solid blue',

                ...this.state.style1,
              }}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name="chevron right" />
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ExpandedViewModel
