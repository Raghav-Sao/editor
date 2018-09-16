import React, { Component, Fragment } from 'react'
import ImageCard from '../ImageCard/index'
import Style from './Style.css'
import 'assests/fontello/css/fontello.css'
import Header from 'components/Header'
import Ratting from 'components/ratting'
import cardDetails from 'data/cardDetails'

class Content extends Component {
  state = {
    selectedImage: 0,
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
      thumnail,
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
        <div class="card__details flex__container">
          <div className="flex__container--column image__thumnail_container justify__center">
            {thumnail.map((data, index) => (
              <div className="image__thumnail flex__container" onClick={() => selectImage(index)}>
                <img src={data} className="align__self__center" />
              </div>
            ))}
          </div>
          <div className="image__container flex__container--column">
            <div>
              <img src={urls[this.state.selectedImage]} />
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
                  {storeName} {storeRatting}/5
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
        </div>
      </Fragment>
    )
  }
}

export default Content
