import React, { Component } from 'react'

class Ratting extends Component {
  render() {
    const { ratting } = this.props
    const absRatting = parseInt(ratting)

    const isHalfRatting = ratting - absRatting
    debugger
    return (
      <div className="ratting">
        {[...Array(absRatting)].map((x, i) => {
          return <i className="icon-star" />
        })}
        {isHalfRatting === 0.5 && <i className="icon-star-half-alt" />}
      </div>
    )
  }
}

export default Ratting
