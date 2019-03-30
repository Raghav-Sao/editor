import React, { Component, Fragment, createRef } from 'react'
import { actionCreator } from 'store/actionCreator'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import Sticker from '../Sticker';

import './CardPageEditor.css';

class CardPage extends React.Component {
    constructor(props) {
      super(props);
    }
 
    getStickers() {
      if (this.props.stickers) {
        return this.props.stickers.map(item, (item) => {
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

        return (
            <Fragment>
                {connectDropTarget(
                    <div className="template_container" key="cardIndex" id="iii">
                    <img
                        id="card__imag e"
                        className={`${isBackgroundImageSelected ? 'active' : ''}`}
                        alt="img"
                        src={src}
                        onClick={e => acivedBackgroundImage(e, cardIndex)}
                        style={this.getImageStyle(styles)}
                        draggable="false"
                        width="100%"
                        ref={this.cardRef}
                        onLoad={this.handleImageLoad}
                    />
                    {showBorderGuid && <div className="card__border" />}
                    {this.getStickers({ stickers, cardIndex, card: this.props.card })}
                    <Fragment>
                        {showLeftGuide && (
                        <div
                            className="align__left__guide"
                            style={{
                            left: alignLeft,
                            }}
                        />
                        )}
                        {showTopGuide && (
                        <div
                            className="align__top__guide"
                            style={{
                            top: alignTop,
                            }}
                        />
                        )}
                        {false && (
                        <div
                            className="align__center__guide"
                            style={{
                            top: activeTop + 30,
                            transform: `translate(0px, ${translateY}px)`,
                            }}
                        />
                        )}
                        {false && (
                        <div
                            className="align__bottom__guide"
                            style={{
                            top: activeTop + 60,
                            transform: `translate(0px, ${translateY}px)`,
                            }}
                        />
                        )}
                        {showCardVerticalMiddleGuide && (
                        <div
                            className="align__card__center__guide"
                            style={{
                            left: cardWidth / 2,
                            }}
                        />
                        )}
                        {showCardHorizontalMiddleGuide && (
                        <div
                            className="align__card__verical_center__guide"
                            style={{
                            left: cardWidth / 2,
                            }}
                        />
                        )}
                    </Fragment>
                    </div>
                )}
            </Fragment>
          );
        }
}


CardPage.prototypes = {
    'onAddSticker': Proptypes.function,
    'onDeleteSticker': Proptypes.function,
    'onBackgroundChange': Proptypes.function,
    'readOnly': Proptypes.boolean,
    'stickers': Proptypes.array,
    'onStickerActivity':  Proptypes.function,
    'showLines': Proptypes.boolean,
}