import React, { Component } from 'react'

class Ratting extends Component {
  render() {
    const { ratting = 5 } = this.props
    const absRatting = parseInt(ratting)
    const isHalfRatting = ratting - absRatting

    return (
      <div className="ratting">
        {[...Array(absRatting)].map((x, i) => {
          return <i className="icon-star" key={i} />
        })}
        {isHalfRatting === 0.5 && <i className="icon-star-half-alt" />}
      </div>
    )
  }
}

export default Ratting
