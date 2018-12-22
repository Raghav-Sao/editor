import React, { Component } from 'react'

class Rating extends Component {
  render() {
    const { rating = 5 } = this.props
    const absRating = parseInt(rating)
    const isHalfRating = rating - absRating

    return (
      <div className="rating">
        {[...Array(absRating)].map((x, i) => {
          return <i className="icon-star" />
        })}
        {isHalfRating === 0.5 && <i className="icon-star-half-alt" />}
      </div>
    )
  }
}

export default Rating
