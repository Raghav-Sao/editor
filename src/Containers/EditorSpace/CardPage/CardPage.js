import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types'; 
import { actionCreator } from 'store/actionCreator'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import Sticker from '../Sticker';

import './CardPage.css';

class CardPage extends React.Component {
    constructor(props) {
      super(props);

      this.cardRef = React.createRef();
    }
 
    getStickers() {
      if (this.props.stickers) {
        return this.props.stickers.map((item) => {
          return (<Sticker 
            onStickerActivity={this.props.onStickerActivity}
            stickerData={item}
            readOnly={this.props.readOnly || item.readOnly} 
            />);
        });
      }
    }

    render() {
        const showBorderGuid = this.props.showLines;
        const cardRect = this.cardRef.current ? this.cardRef.current.getBoundingClientRect() : {};
        const alignTop = showBorderGuid && this.cardRef.current ? cardRect.top - window.scrollY : 0;
        const alignLeft = showBorderGuid && this.cardRef.current ? cardRect.left - window.scrollX : 0;
        const cardWidth = this.cardRef.current ? cardRect.width : 0;
        const background = this.props.background;
        const src = background && background.src;

        return (
            <Fragment>
                    <div className="template_container" key="cardIndex" id="iii">
                    <img
                        id="card__image"
                        alt="img"
                        src={src}
                        draggable="false"
                        width="100%"
                        ref={this.cardRef}
                    />
                    {showBorderGuid && <div className="card__border" />}
                    {this.getStickers()}
                    <Fragment>
                        {showBorderGuid && (
                        <div
                            className="align__left__guide"
                            style={{
                            left: alignLeft,
                            }}
                        />
                        )}
                        {showBorderGuid && (
                        <div
                            className="align__top__guide"
                            style={{
                            top: alignTop,
                            }}
                        />
                        )}
                        {showBorderGuid && (
                        <div
                            className="align__card__center__guide"
                            style={{
                            left: cardWidth / 2,
                            }}
                        />
                        )}
                        {showBorderGuid && (
                        <div
                            className="align__card__verical_center__guide"
                            style={{
                            left: cardWidth / 2,
                            }}
                        />
                        )}
                    </Fragment>
                    </div>
            </Fragment>
          );
        }
}


CardPage.prototypes = {
    'onAddSticker': PropTypes.function,
    'onDeleteSticker': PropTypes.function,
    'onBackgroundChange': PropTypes.function,
    'readOnly': PropTypes.boolean,
    'stickers': PropTypes.array,
    'onStickerActivity':  PropTypes.function,
    'showLines': PropTypes.boolean,
    'background': PropTypes.string
}

export default CardPage;