import React, { Component, Fragment, createRef } from 'react'
import PropTypes from 'prop-types'; 
import { actionCreator } from 'store/actionCreator'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd';
import CardPage from '../CardPage';
import {connect} from 'react-redux';

import './CardPageEditor.css';

class CardPageEditor extends Component {

  constructor(props) {
    super(props);
  }
  
  cardRef = React.createRef()

  onAddSticker = ({ position, src, style, text, type }) => {
    const rootRef = findDOMNode(this)
    const { x, y } = rootRef.getBoundingClientRect()
    const sticker = {
        tempId: Date.now(),
        type,
        resource: src || text,
        styles: {
          position: {
            left: position.startX - x - 20,
            top: position.startY - y - 20,
          },
          scale: 1,
          rotation: {
            unit: 'deg',
            rotation: 0,
          },
          translate: {
            translateX: 0,
            translateY: 0,
          },
          color: '#FFF',
          fontSize: 25,
          width: type === 'text' ? 250 : 150,
          textAlign: 'center',
        },
        boundingRect: {
          top: window.scrollY + position.startY - 20,
        },
      };
     this.props.dispatch(actionCreator.ADD_TEXT_STICKER({ sticker, cardId: this.props.cardId }))
  }

  onStickerActivity = () => {}
  onStickerAdd = () => {}
  onStickerDelete = () => {}
  onBackgroundChange = () => {}

  render() {
    const {
        props: {
          connectDropTarget,
        },
      } = this;
    const card = this.props.cardCollection[this.props.cardId];

    return (
      <Fragment>
        {connectDropTarget(
          <div className="editor-wrapper">
            <CardPage 
              background={card.background}
              stickers={card.stickers}
              showLines
              onStickerActivity={this.onStickerActivity}
              onStickerAdd={this.onStickerAdd}
              onStickerDelete={this.onStickerDelete}
              onBackgroundChange={this.onBackgroundChange}
            />
          </div>
        )}
      </Fragment>
    )
  }
}

const dropSpecs = {
  drop(props, monitor, component) {
    const { _id, src, styles, text, type } = monitor.getItem()
    const { x: clientX, y: clientY } = monitor.getClientOffset()
    const { x: sourceX, y: sourceY } = monitor.getInitialSourceClientOffset()
    const { x: initialClientX, y: initialClientY } = monitor.getInitialClientOffset()
    const startX = clientX - initialClientX + sourceX
    const startY = clientY - initialClientY + sourceY
    const position = { startX, startY }
    if (type) {
      component.onAddSticker({ position, src, styles, text, type })
    }
    return { name: 'Content' }
  },
}
const dropTypes = ['TextToolbar', 'ImageToolbar']
const dropCollect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
})

const mapStateToProps = ({ editorSpace: { cardCollection } }) => ({ cardCollection })

export default connect(mapStateToProps)(DropTarget(dropTypes, dropSpecs, dropCollect)(CardPageEditor));
