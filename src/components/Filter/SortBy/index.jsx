import React, { Component } from 'react'

import Style from './Style.css'

class SortBy extends Component {
  render() {
    return (
      <div className="row sidebarFilter">
        <span className="row align-center">Sort By:</span>
        <button className="textButton">Price: Low to High</button>
        <button className="textButton">Price: High to Low</button>
        <button className="textButton">Popularity</button>
        <button className="textButton">New</button>
      </div>
    )
  }
}

export default SortBy
