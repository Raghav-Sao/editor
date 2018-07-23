import React, { Component } from 'react'
import ImageCard from '../ImageCard/index.js'
import Style from './Style.css'
import 'assests/fontello/fontello.scss'

import cards from 'data/sellers-cards'
import cards2 from 'data/sellers-cards2'
console.log(cards)
class Content extends Component {
  render() {
    return (
      <div class="row gallary">
        <div class="column">{cards.map((cardData, index) => <ImageCard data={cardData} />)}</div>
        <div class="column">{cards2.map((cardData, index) => <ImageCard data={cardData} />)}</div>
      </div>
    )
  }
}

export default Content
