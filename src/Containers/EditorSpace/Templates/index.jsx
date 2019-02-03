import React, { Component } from 'react'
import { actionCreator } from 'store/actionCreator'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Sticker from 'Components/Sticker'
import CardPageEditor from '../CardPageEditor';
import './Style.css'

class Templates extends Component {
  componentDidMount() {
    window.localStorage.removeItem('savedUndoData')
    window.localStorage.removeItem('savedRedoData')
    document.addEventListener('keyup', this.deleteActiveSticker)
    const {
      props: {
        dispatch,
        match: {
          params: { id: _id = '5c3ed16a3fde554da3ad1eea' },
        },
      },
    } = this
    dispatch(actionCreator.FETCH_EDITOR_CARD({ _id }))
  }

  saveChanges = () => {
    const savedUndoData = JSON.parse(window.localStorage.getItem('savedUndoData') || '[]'),
      {
        props: { activeSticker, cards },
      } = this,
      newUndoState = [...savedUndoData, { activeSticker, cards }]
    window.localStorage.setItem('savedUndoData', JSON.stringify(newUndoState))
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.deleteActiveSticker)
  }

  deleteActiveSticker = e => {
    if (e.keyCode === 46 || e.keyCode === 8) {
      const {
        props: {
          dispatch,
          activeSticker: { _id, type },
        },
      } = this
      if (_id && type !== 'text') dispatch(actionCreator.DELETE_STICKER({ _id }))
    } else if (e.keyCode == 90 && e.ctrlKey) {
      const savedUndoData = JSON.parse(window.localStorage.getItem('savedUndoData' || '[]')),
        savedUndoDataLength = savedUndoData.length

      if (!savedUndoDataLength) return

      const savedRedoData = JSON.parse(window.localStorage.getItem('savedRedoData') || '[]'),
        {
          props: { activeSticker, cards },
        } = this,
        [newUndoData, newState] = [
          savedUndoData.slice(0, savedUndoDataLength - 1),
          savedUndoData.slice(savedUndoDataLength - 1)[0],
        ],
        newRedoData = [{ activeSticker, cards }, ...savedRedoData]
      window.localStorage.setItem('savedUndoData', JSON.stringify(newUndoData))
      window.localStorage.setItem('savedRedoData', JSON.stringify(newRedoData))
      this.props.dispatch(actionCreator.UNDO_CHANGES({ newState }))
    } else if (e.keyCode == 89 && e.ctrlKey) {
      const savedRedoData = JSON.parse(window.localStorage.getItem('savedRedoData') || '[]'),
        savedRedoDataLength = savedRedoData.length

      if (!savedRedoDataLength) return

      const savedUndoData = JSON.parse(window.localStorage.getItem('savedUndoData' || '[]')),
        {
          props: { activeSticker, cards },
        } = this,
        [newState, ...newRedoData] = savedRedoData,
        newUndoData = [...savedUndoData, { activeSticker, cards }]
      window.localStorage.setItem('savedUndoData', JSON.stringify(newUndoData))
      window.localStorage.setItem('savedRedoData', JSON.stringify(newRedoData))
      this.props.dispatch(actionCreator.UNDO_CHANGES({ newState }))
    }
  }

  acivedBackgroundImage = (e, cardIndex) => {
    this.props.dispatch(
      actionCreator.UPDATE_BACKGROUND_IMAGE_STATUS({ isBackgroundImageSelected: true, cardIndex })
    )
    // this.props.dispatch(actionCreator.SET_ACTIVE_STICKER({ id: null })) not required

    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  getStickers = ({ stickers, cardIndex, card }) =>
    stickers.map((sticker, index) => (
      <Sticker data={sticker} key={index} cardIndex={cardIndex} card={card} />
    ))

  render() {
    const { cards, activeSticker, connectDropTarget, dispatch } = this.props

    return (
      <div className="templates__container">
        <div id="background__image__container" className="col-10 drop-target">
          {cards.map((card, index) => (
            <CardPageEditor
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
export default withRouter(connect(mapStateToProps)(Templates))
