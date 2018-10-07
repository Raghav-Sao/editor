import React, { Component } from 'react'
import { actionCreator } from 'store/actionCreator'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import Sticker from 'Components/Sticker'
import Template from './Template'
import './Style.css'

class Templates extends Component {
  acivedBackgroundImage = (e, cardIndex) => {
    this.props.dispatch(
      actionCreator.UPDATE_BACKGROUND_IMAGE_STATUS({ isBackgroundImageSelected: true, cardIndex })
    )
    // this.props.dispatch(actionCreator.SET_ACTIVE_STICKER({ id: null })) not required

    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  getStickers = ({ stickers, cardIndex }) =>
    stickers.map((sticker, index) => <Sticker data={sticker} key={index} cardIndex={cardIndex} />)

  render() {
    const { cards, activeSticker, connectDropTarget, dispatch } = this.props

    return (
      <div className="templates__container">
        <div id="background__image__container" className="col-10 drop-target">
          {cards.map((card, index) => (
            <Template
              acivedBackgroundImage={this.acivedBackgroundImage}
              cardIndex={index}
              dispatch={this.props.dispatch}
              getStickers={this.getStickers}
              card={card}
              key={index}
              activeSticker={activeSticker}
            />
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ editorSpace: { cards, activeSticker } }) => ({
  cards,
  activeSticker,
})
export default connect(mapStateToProps)(Templates)
