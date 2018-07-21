import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Image extends Component {
  render() {
    const { isLiked=true, src, price ="20.3", seller= "Radhe Enterpise", description="fasdfsa adsfd adsfas asfdasf adsfdasf sfas", star=4, id="abc1221" } = this.props;
    return (
      <div className="card card__image__container">
        <div className="card__header">
          <img src={src} />
          <i className="like icon-heart-empty"></i>
          <div className="ratting">
            {[...Array(5)].map((x, i) => {
                return <i className="icon-star"/>
              })
            }
          </div>
        </div>
        <div className="card-footer card__image__mata">
          <div className="left">id: dfasf</div>
          <div className="right"><a className="link">offer: ${price} from {seller}</a></div>
          <div className="description clear">fasfas asdfas dfsafas sfasfas sfdafa </div>
          
        </div>
      </div>
    )
  }
}

export default Image;
