import React, { PureComponent } from 'react';
import { fromEvent, merge } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { handleDrag } from 'Containers/EditorSpace/editorSpaceUtils';

import { Page } from 'Components';

import './Pages.scss';

const stopEvents$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'mouseup'));

export class Pages extends PureComponent {
    handleDrag = (e, type, styles, stickerRef, stickerId, pageId) => {
        if (stickerRef === null) return;
        // const sticker = stickerRef.current;
        // const {
        //     bottom,
        //     left,
        //     top,
        //     right,
        //     width,
        //     height,
        //     left: activeBoundingLeft,
        //     top: activeBoundingTop,
        // } = sticker.getBoundingClientRect();
        // const { offsetWidth } = sticker;
        // const {
        //     stickerData: {
        //         styles: {
        //             rotation: { rotation },
        //         },
        //     },
        // } = this.props;


        // if (this.state.isRotating) return;
        // this.setState({ isDragging: true });
        //add here checkForReadjust
        const resizeOrRotate$ = handleDrag(e, styles, stopEvents$)
        resizeOrRotate$.subscribe(calculatedStyle => {
            console.log(calculatedStyle);
            // this.props.updateSticker(this.props.stickerData._id, calculatedStyle, type)
            this.props.updateSticker({ calculatedStyle, type, stickerId, pageId })
        })
    }

    render() {
        const { pages = {} } = this.props;
        return (
            <div className="pages">
                {Object.keys(pages).map((key, index) =>
                    <Page key={key} page={pages[key]} pageNo={index + 1} handleDrag={this.handleDrag} {...this.props} />
                )}
            </div>
        )
    }
}
