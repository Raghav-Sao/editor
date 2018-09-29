import React, { Component } from 'react'
import ImageCard from '../ImageCard/index'
import SortBy from 'components/Filter/SortBy'
import SidebarFilter from 'components/SidebarFilter'
import Style from './Style.css'
import 'assests/fontello/css/fontello.scss'
import cards from 'data/sellers-cards'
import cards2 from 'data/sellers-cards2'
console.log(cards)
class Content extends Component {
  state = {
    a: cards,
    b: cards2,
  }
  componentWillMount() {}
  render() {
    const length = Math.ceil(cards.length / 2)
    const [data1, data2] = [cards.slice(0, length), cards.slice(length)]
    debugger
    return (
      <div class="row">
        <SidebarFilter />
        <div class="row gallery">
          <div class="row">
            <SortBy />
          </div>
          <div class="row">
            <div class="column">
              {data1.map((cardData, index) => <ImageCard data={cardData} />)}
            </div>
            <div class="column">
              {data2.map((cardData, index) => <ImageCard data={cardData} />)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Content
