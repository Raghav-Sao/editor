import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';
import { actionCreator } from 'store/actionCreator';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import CardPage from '../CardPage';
import EditorToolbar from '../EditorToolbar';

import './CardPageEditor.css';

class CardPageEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    cardRef = React.createRef();

    updateSticker = (_id, calculatedStyle, type, cardIndex=this.props.cardId) => {
        const { bottom, top, right, left, width } = calculatedStyle
        const boundingRect = {
          bottom,
          left,
          right,
          top,
          width,
        }
        if (type === 'rotate') {
          const { rotation } = calculatedStyle
          this.props.dispatch(
            actionCreator.ROTATE_STICKER({
              _id,
              rotation,
              cardIndex,
              boundingRect,
            })
          )
        } else if (type === 'drag') {
          const { translateX, translateY } = calculatedStyle
          const translate = { translateX, translateY }
          // console.log(translateY, window.scrollY, top, this.stickerRef.current.getBoundingClientRect())
          this.props.dispatch(
            actionCreator.MOVE_STICKER({
              _id,
              translate,
              cardIndex,
              boundingRect,
            })
          )
        } else {
          const { diff, leftDiff, offsetWidth, topDiff } = calculatedStyle
          if (diff < 0 && offsetWidth <= 2) return
          this.props.dispatch(
            actionCreator.RESIZE_STICKER({
              _id,
              diff,
              leftDiff,
              topDiff,
              cardIndex,
              boundingRect,
            })
          )
        }
      }

    onAddSticker = ({ position, src, style, text, type }) => {
        const rootRef = findDOMNode(this);
        const { x, y } = rootRef.getBoundingClientRect();
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
        const card = { ...this.props.cardCollection[this.props.cardId] };
        card.stickers.push(sticker);
        this.props.dispatch(actionCreator.SAVE_CARD_TO_STORE({ card }));
    };

    onStickerActivity = (action, sticker) => {
        if (action === 'SELECT') {
            this.setState({
                activeSticker: sticker,
            });
        }
    };

    onStickerAdd = () => {};

    onStickerDelete = () => {};

    onBackgroundChange = () => {};

    onToolbarActivity = (action, sticker, params) => {
        const card = { ...this.props.cardCollection[this.props.cardId] };
        if (action === 'DELETE') {
            card.stickers = card.stickers.filter(item => item !== sticker);
            this.setState({ activeSticker: null });
        } else if (['TEXT_FONT_CHANGE', 'TEXT_STYLE_CHANGE', 'STYLE_CHANGE'].indexOf(action) > -1) {
            const stickerIndex = card.stickers.indexOf(sticker);
            const updatedSticker = { ...sticker };
            updatedSticker.styles = {
                ...updatedSticker.styles,
                ...params,
            };
            card.stickers[stickerIndex] = updatedSticker;
            this.setState({ activeSticker: updatedSticker });
        } else if (action === 'SAVE') {
            // todo: save to backend
        }

        this.props.dispatch(actionCreator.SAVE_CARD_TO_STORE({ card }));
    };

    render() {
        const {
            props: { connectDropTarget },
        } = this;
        const card = this.props.cardCollection[this.props.cardId];

        return (
          <div className="card_page_editor_wrapper">
              {this.state.activeSticker && (
            <EditorToolbar
                      activeSticker={this.state.activeSticker}
                      onToolbarActivity={this.onToolbarActivity}
                    />
                )}
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
                      cardId={card.id}
                      updateSticker={this.updateSticker}
                    />
                    </div>
                )}
            </div>
        );
    }
}

const dropSpecs = {
    drop(props, monitor, component) {
        const { _id, src, styles, text, type } = monitor.getItem();
        const { x: clientX, y: clientY } = monitor.getClientOffset();
        const { x: sourceX, y: sourceY } = monitor.getInitialSourceClientOffset();
        const { x: initialClientX, y: initialClientY } = monitor.getInitialClientOffset();
        const startX = clientX - initialClientX + sourceX;
        const startY = clientY - initialClientY + sourceY;
        const position = { startX, startY };
        if (type) {
            component.onAddSticker({ position, src, styles, text, type });
        }
        return { name: 'Content' };
    },
};
const dropTypes = ['TextToolbar', 'ImageToolbar'];
const dropCollect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
});

const mapStateToProps = ({ editorSpace: { cardCollection } }) => ({ cardCollection });

export default connect(mapStateToProps)(DropTarget(dropTypes, dropSpecs, dropCollect)(CardPageEditor));
