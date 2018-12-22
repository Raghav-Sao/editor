import React, { Component, Fragment } from 'react'
import ImageCard from '../ImageCard/index'
import Style from './Style.css'
import 'assests/fontello/css/fontello.css'
import Header from 'oldComponents/Header'
import Ratting from 'oldComponents/ratting'
import cardDetails from 'data/cardDetails'
import { fromEvent, merge } from 'rxjs'
import { distinctUntilChanged, map, takeUntil, tap, throttleTime } from 'rxjs/operators'

const stopEvents$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'mouseup'))

class Content extends Component {
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
    // console.log(s)
    // const diff = 90 / 400
    // let calcTransY = 360 - diff * (x + width - mouseX)

    // calcTransY = calcTransY > 360 ? 360 : calcTransY
    // calcTransY = calcTransY < 360 ? 90 : calcTransY
    let dist = Math.min(904, 904 - mouseX)
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
    const selectImage = index => {
      this.setState({
        selectedImage: index,
      })
    }
    const {
      seller: { stock, price, name: storeName, ratting: storeRatting = 4 },
      other_seller: { count: otherSellerCount, min_price: minPrice = 10 },
      thumbnail,
      id,
      rating,
      color,
      language,
      type,
      created_at: createdAt,
      updated_at: updatedAt,
      urls,
      tags,
      name = 'Yellow Marriage Card',
    } = cardDetails
    return (
      <Fragment>
        <Header />
        aa
        <div class="card__details flex__container">
          <div className="flex__container--column image__thumbnail_container justify__center">
            {thumbnail.map((data, index) => (
              <div className="image__thumbnail flex__container" onClick={() => selectImage(index)}>
                <img src={data} className="align__self__center" />
              </div>
            ))}
          </div>
          <div
            className="image__container flex__container--column"
            style={{ perspective: '5000px' }}
          >
            <img
              src={urls[this.state.selectedImage]}
              onMouseDown={e => this.star3d(e)}
              draggable="false"
              style={{
                position: 'relative',
                left: '400px',
                transformOrigin: '0% 50% 0px',
                width: '400px',
                zIndex: 10,
                ...this.state.style,
              }}
              ref="front"
            />
            <img
              src="https://www.w3schools.com/w3images/nature.jpg"
              onMouseDown={e => this.star3d(e)}
              draggable="false"
              style={{
                position: 'absolute',
                left: '400px',
                transformOrigin: '0% 50% 0px',
                width: '400px',
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
                ...this.state.style1,
              }}
            />

            <div className="flex__container">
              <button className="buy__now">Buy Now</button>
              <button className="add__to__cart">Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="image__details">
          <div className="image__details__header">
            <h1>{name}</h1>
            <Ratting ratting={4.5} />
          </div>
          <div className="price">
            <span>₹{price}</span>
          </div>
          <div className="tag__container">
            {tags.map((data, index) => (
              <div className="tag flex__container">
                <span className="icon-right-open align__self__center">{data}</span>
              </div>
            ))}
          </div>
          <div className="flex__container--column sellers__details">
            <div className="seller__details">
              Sold by:
              <a href="facebook.com" target="__blank">
                {storeName} {storeRatting}
                /5
              </a>
            </div>
            <div className="other__seller__details f__13">
              <a href="facebook.com" target="__blank">
                {otherSellerCount} Other offers
              </a>
              <span> starting from ₹{minPrice}</span>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Content
