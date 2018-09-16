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
    const change = () => {
      console.log(cards2)
      console.log(cards)
      this.setState({
        a: cards2,
        b: cards,
      })
    }
    return (
      <div class="row">
        <SidebarFilter />
        <div class="row gallery">
          <div class="row">
            <SortBy />
          </div>
          <div class="row">
            <div class="column">
              {this.state.a.map((cardData, index) => <ImageCard data={cardData} />)}
            </div>
            <div class="column">
              {this.state.b.map((cardData, index) => <ImageCard data={cardData} />)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Content
