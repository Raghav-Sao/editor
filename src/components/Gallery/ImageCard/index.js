import React, { Component } from 'react'

class ImageCard extends Component {
  render() {
    const {
      data: {
        color,
        description = 'fasdfsa adsfd adsfas asfdasf adsfdasf sfas',
        id = 'abc1221',
        isLiked = true,
        price = '20.3',
        seller: { name },
        star = 4,
        other_seller_info,
        urls = [],
      },
    } = this.props
    debugger
    return (
      <div className="card card__image__container">
        <div className="card__body pointer">
          <img src={urls[0]} />
          <i className="like icon-heart-empty" />
          <div className="ratting">
            {[...Array(5)].map((x, i) => {
              return <i className="icon-star" />
            })}
          </div>
        </div>
        <div className="card__footer card__image__mata">
          <div className="link">Green-Card #18c001</div>
          <div>
            <a className="link">
              {price} from {name}
            </a>
            <a className="link bold">
              &nbsp;({other_seller_info.count} other offers)
            </a>
          </div>
          <div className="description clear">{color} Marriage Card</div>
        </div>
      </div>
    )
  }
}

export default ImageCard
