import React, { createRef, Component, Fragment } from 'react'
import SortBy from 'Components/Filters/SortBy/SortBy'
import { findDOMNode } from 'react-dom'
import Style from './Style.css'
import GalleryCard from '../GalleryCard'
import { Grid } from 'semantic-ui-react'

import 'assests/fontello/css/fontello.scss'
import cards from 'data/sellers-cards'
import cards2 from 'data/sellers-cards2'
console.log(cards)
class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data1: [],
      data2: [],
    }
  }
  componentDidMount() {
    this.refs.stickerRef.addEventListener('scroll', this.handle, true)
    const length = Math.ceil(cards.length / 2)
    const [data1, data2] = [cards.slice(0, length), cards.slice(length)]
    this.setState({
      data1,
      data2,
    })
  }

  handle = event => {
    if (
      !this.state.loading &&
      this.refs.stickerRef.clientHeight + this.refs.stickerRef.scrollTop >=
        this.refs.stickerRef.scrollHeight - 500
    ) {
      this.setState(
        {
          loading: true,
          data1: [...this.state.data1, ...this.state.data1.slice(0, 5)],
          data2: [...this.state.data2, ...this.state.data2.slice(0, 5)],
        },
        () =>
          setTimeout(() => {
            this.setState({
              loading: false,
            })
          }, 800)
      )
    }
  }

  render() {
    return (
      <Fragment>
        <div>
          {this.state.loading}
          <SortBy />
          <div className="ui doubling two column grid gallery__container">
            <div ref="stickerRef" className="row">
              <Grid.Column>
                <GalleryCard data={this.state.data1} />
              </Grid.Column>
              <Grid.Column>
                <GalleryCard data={this.state.data2} />
              </Grid.Column>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Content
