import React, { Component } from 'react'
import { Button, Grid, Header, Icon, Image, Modal, Rating } from 'semantic-ui-react'
import cardDetails from 'data/cardDetails'
import ExpandedViewModal from '../ExpandedView'

import './Style.scss'

class CardDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: 0,
      style: {},
      openExpandedModal: true,
    }
  }

  toggleExpandedModal = () => {
    this.setState(prevState => ({
      openExpandedModal: !prevState.openExpandedModal,
    }))
  }
  render() {
    const selectImage = index => {
      this.setState({
        selectedImage: index,
      })
    }
    const {
      seller: { stock, price, name: storeName, rating: storeRating = 4 },
      other_seller: { count: otherSellerCount, min_price: minPrice = 10 },
      thumbnail,
      id,
      rating,
      color,
      language,
      type,
      created_at: createdAt,
      updated_at: updatedAt,
      urls,
      tags,
      name = 'Yellow Marriage Card',
    } = cardDetails
    return (
      <Grid doubling columns={2} divided className="card__details__container">
        <Grid.Row>
          <Grid.Column width={11}>
            <Grid verticalAlign="middle" centered>
              <Grid.Row>
                <Grid.Column style={{ flex: '0 0 100px' }}>
                  {cardDetails.thumbnail.map((data, index) => (
                    <div className="image__thumbnail" onClick={() => selectImage(index)}>
                      <Image src={data} className="thumbnail" />
                    </div>
                  ))}
                </Grid.Column>
                <Grid.Column className="card__image">
                  <div className="relative">
                    <Image src={urls[this.state.selectedImage]} />
                    <Icon className="eye__view" name="eye" onClick={this.toggleExpandedModal} />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={5}>
            <div className="image__details">
              <div className="image__details__header">
                <Header as="h2">
                  {name}
                  <Header.Subheader>
                    <Rating icon="star" defaultRating={4.5} maxRating={5} rating={rating} />
                  </Header.Subheader>
                </Header>
              </div>
              <div className="price__info">
                <span>₹{price}</span>
              </div>
              <div className="tag__container">
                {tags.map(({ icon, name }, index) => (
                  <div className="tag">
                    <Icon name={'tag' || icon} />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
              <div className="flex__container--column sellers__details">
                <div className="seller__details">
                  Sold by:&nbsp;
                  <a href="facebook.com" target="__blank">
                    {storeName} {storeRating}
                    /5
                  </a>
                </div>
                <div className="other__seller__details f__13">
                  <a href="facebook.com" target="__blank">
                    {otherSellerCount} other offers
                  </a>
                  <span> starting from ₹{minPrice}</span>
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
        <ExpandedViewModal
          selectedImage={urls[this.state.selectedImage]}
          open={this.state.openExpandedModal}
          toggleExpandedModal={this.toggleExpandedModal}
        />
      </Grid>
    )
  }
}

export default CardDetails
