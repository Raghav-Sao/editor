import React, { Component, Fragment } from 'react'
import { actionCreator } from '../../store/actionCreator'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

import Card from './Card'
import Style from './Style.css'
import Sticker from '../Sticker'

class CardEditorSpace extends Component {
  aciveBackgroundImage = (e, cardIndex) => {
    this.props.dispatch(
      actionCreator.UPDATE_BACKGROUND_IMAGE_STATUS({ isBackgroundImageSelected: true, cardIndex })
    )
    // this.props.dispatch(actionCreator.SET_ACTIVE_STICKER({ id: null })) not required

    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  onAddSticker = ({ position, src, style, text, type, cardIndex }) => {
    const rootRef = findDOMNode(this)
    const { x, y } = rootRef.getBoundingClientRect()
    style = {
      ...style,
      left: position.startX - x,
      top: position.startY - y,
      position: 'absolute',
      width: type === 'text' ? 250 : 150,
    }
    style = type === 'text' ? { ...style, color: '#000', textAlign: 'center' } : style
    this.props.dispatch(
      actionCreator.ADD_TEXT_STICKER({ style: { text, src, style, type }, cardIndex })
    )
  }

  onMoveSticker = (id, position) => {
    const rootRef = findDOMNode(this)
    const { x, y } = rootRef.getBoundingClientRect()
    const style = { left: position.startX - x, top: position.startY - y }
    this.props.dispatch(actionCreator.MOVE_STICKER({ id, style }))
  }
  render() {
    const { card, connectDropTarget } = this.props
    const getStickers = ({ stickers, cardIndex }) =>
      stickers.map((sticker, index) => (
        <Sticker
          data={sticker}
          key={index}
          onClick={e => this.onTextToolbarClick(e)}
          cardIndex={cardIndex}
        />
      ));

    return (
      <div id="background__image__container" className="col-10 drop-target">
        {card.map(
          (
            { backgroundImage, backgroundImageStyle, isBackgroundImageSelected, stickers },
            index
          ) => (
            <Card
              index={index}
              isBackgroundImageSelected={isBackgroundImageSelected}
              backgroundImageStyle={backgroundImageStyle}
              stickers={stickers}
              aciveBackgroundImage={this.aciveBackgroundImage}
              connectDropTarget={connectDropTarget}
              backgroundImage={backgroundImage}
              onAddSticker={this.onAddSticker}
              dispatch={this.props.dispatch}
            />
          )
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ imageEditor: { card } }) => ({
  card,
})
export default connect(mapStateToProps)(CardEditorSpace)
