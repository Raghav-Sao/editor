import react from 'react';
import React, { Component, Fragment } from 'react';
import { actionCreator } from 'store/actionCreator';

import { DropTarget } from 'react-dnd'

class Card extends Component {
  componentDidMount() {
    document.addEventListener('click', () => this.deactiveBackgroundImage(this.props.index));
  }

  deactiveBackgroundImage = cardIndex => {
    this.props.dispatch(
      actionCreator.UPDATE_BACKGROUND_IMAGE_STATUS({ isBackgroundImageSelected: false, cardIndex })
    )
  }
  render() {
    const {
      props: {
        index,
        isBackgroundImageSelected,
        backgroundImageStyle,
        stickers,
        aciveBackgroundImage,
        connectDropTarget,
        backgroundImage,
        onAddSticker,
      },
    } = this
    return (
      <Fragment>
        {connectDropTarget(
          <div>
            <img
              id="card__image"
              className={`${isBackgroundImageSelected ? 'active' : ''}`}
              alt="img"
              src={backgroundImage}
              onClick={e => aciveBackgroundImage(e, index)}
              style={backgroundImageStyle}
              draggable="false"
              width="100%"
            />
            {stickers}
          </div>
        )}
      </Fragment>
    )
  }
}

const dropSpecs = {
  drop(props, monitor, component) {
    const { id, src, style, text, type } = monitor.getItem()
    const { x: clientX, y: clientY } = monitor.getClientOffset()
    const { x: sourceX, y: sourceY } = monitor.getInitialSourceClientOffset()
    const { x: initialClientX, y: initialClientY } = monitor.getInitialClientOffset();
    console.log(sourceX, initialClientX, clientX)
    const startX = (clientX - initialClientX) + sourceX;
    const startY = (clientY - initialClientY) + sourceY;
    const position = { startX, startY }
    if (type) {
      props.onAddSticker({ position, src, style, text, type, cardIndex: props.index })
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

export default DropTarget(dropTypes, dropSpecs, dropCollect)(Card)
