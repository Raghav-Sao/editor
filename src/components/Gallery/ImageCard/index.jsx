import React, { Component } from 'react'
import { push } from 'react-router-redux'
import LazyLoad from 'react-lazyload'
import { connect } from 'react-redux'
import Loader from 'components/Loader'

import './Style.css'

import Ratting from 'components/ratting'

class ImageCard extends Component {
  showDetails = () => {
    window.open('/gallery/details/1')
  }
  render() {
    debugger
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
    return (
      <div className="card card__image__container">
        <div className="card__body">
          <LazyLoad height={400} placeholder={<Loader />}>
            <img className="pointer" src={urls[0]} onClick={() => this.showDetails()} />
          </LazyLoad>
          <div className="flex__container like__start_container">
            <Ratting ratting={3.5} />
            <i className={`like ${isLiked ? 'icon-heart' : 'icon-heart-empty red'}`} />
          </div>
        </div>
        <div className="card__footer card__image__mata">
          <div className="link">Green-Card #18c001</div>
          <div>
            <a className="link">
              {price} from {name}
            </a>
            <a className="link bold">&nbsp;({other_seller_info.count} other offers)</a>
          </div>
          <div className="description clear">{color} Marriage Card</div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = () => ({})
export default connect(mapStateToProps)(ImageCard)
