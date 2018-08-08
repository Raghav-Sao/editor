import React, { Component } from 'react'

class Ratting extends Component {
  render() {
    return (
      <div className="ratting">
        {[...Array(5)].map((x, i) => {
          return <i className="icon-star" />
        })}
      </div>
    )
  }
}

export default Ratting
