import React, { Component, Fragment } from 'react'
import Rating from 'Components/Rating'
import { connect } from 'react-redux'
import { Button, Card, Grid, Icon, Image } from 'semantic-ui-react'
import ReactDOM from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { withRouter } from 'react-router-dom'
import cardDetails from 'data/cardDetails'

import './Style.css'

class GalleryCard extends Component {
  componentDidMount() {
    const url = new URL(window.location)
    const colors = url.searchParams.get('color') ? url.searchParams.get('color').split('-') : []
    const language = url.searchParams.get('language')
      ? url.searchParams.get('language').split('-')
      : []
    if (colors.length) {
      const colorData = colors.reduce((colors, data) => {
        return { ...colors, [data]: true }
      }, {})
      this.props.dispatch({
        type: 'color'.toUpperCase(),
        payload: {
          color: colorData,
        },
      })
    }
    if (language.length) {
      const languageData = colors.reduce((languages, data) => {
        return { ...languages, [data]: true }
      }, {})
      this.props.dispatch({
        type: 'language'.toUpperCase(),
        payload: {
          language: languageData,
        },
      })
    }
  }

  handleBuyClick = ({ target: { name } }) => {
    console.log(name, this)
  }

  handleAddToCartClick = ({ target: { name } }) => {
    console.log(name)
  }

  toggleLikeCard = event => {
    console.log(event.target.getAttribute('data'))
  }

  render() {
    const {
      props: { data },
    } = this

    return (
      <Fragment>
        {data.map(
          (
            {
              id,
              price,
              rating,
              color,
              language,
              type,
              urls,
              seller: { name: sellerName, rating: sellerRating },
            },
            index
          ) => (
            <Card className="card__container" key={index} fluid>
              <Card.Content>
                <Icon
                  data={id}
                  floated="right"
                  name="heart outline"
                  onClick={this.toggleLikeCard}
                />
                <Carousel infiniteLoop={true} showThumbs={false}>
                  <div>
                    <img src={urls[0]} />
                    <p className="legend">Legend 1</p>
                  </div>
                  <div>
                    <img src={urls[1]} />
                    <p className="legend">Legend 2</p>
                  </div>
                </Carousel>

                <Card.Header>
                  <div className="ui floated right">
                    <Rating rating={rating} />
                  </div>
                  <Icon className="ui floated left" name="rupee" /> {price}
                </Card.Header>
                <Card.Meta>#{id}</Card.Meta>
                <Card.Description>
                  <a href={`/gallery?color=${color}`} target="_blank">
                    #{color}
                  </a>
                  ,&nbsp;
                  <a href={`/gallery?language=${language}`} target="_blank">
                    #{language}
                  </a>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    name={id}
                    color="green"
                    loading={false}
                    onClick={this.handleBuyClick}
                  >
                    Buy
                  </Button>
                  <Button basic color="yellow" loading={false} onClick={this.handleAddToCartClick}>
                    Add To Cart
                  </Button>
                </div>
              </Card.Content>
            </Card>
          )
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ galleryReducer }) => ({ galleryReducer })
export default withRouter(connect(mapStateToProps)(GalleryCard))
