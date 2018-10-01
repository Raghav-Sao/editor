import React, { Component } from 'react'
import { actionCreator } from 'store/actionCreator'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import Sticker from 'Components/Sticker'
import Template from './Template'
import './Style.css'

class Templates extends Component {
  aciveBackgroundImage = (e, cardIndex) => {
    this.props.dispatch(
      actionCreator.UPDATE_BACKGROUND_IMAGE_STATUS({ isBackgroundImageSelected: true, cardIndex })
    )
    // this.props.dispatch(actionCreator.SET_ACTIVE_STICKER({ id: null })) not required

    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  getStickers = ({ stickers, cardIndex }) =>
    stickers.map((sticker, index) => (
      <Sticker
        sticker={sticker}
        key={index}
        onClick={e => this.onTextToolbarClick(e)}
        cardIndex={cardIndex}
      />
    ))

  render() {
    const { card, connectDropTarget, dispatch } = this.props

    return (
      <div className="templates__container">
        <div id="background__image__container" className="col-10 drop-target">
          {card.map(
            (
              { backgroundImage, backgroundImageStyle, isBackgroundImageSelected, stickers },
              index
            ) => (
              <Template
                index={index}
                isBackgroundImageSelected={isBackgroundImageSelected}
                backgroundImageStyle={backgroundImageStyle}
                stickers={this.getStickers({ stickers, cardIndex: index })}
                aciveBackgroundImage={this.aciveBackgroundImage}
                backgroundImage={backgroundImage}
                onAddSticker={this.onAddSticker}
                dispatch={dispatch}
              />
            )
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ imageEditor: { card } }) => ({
  card,
})
export default connect(mapStateToProps)(Templates)
