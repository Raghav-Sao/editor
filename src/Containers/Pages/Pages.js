import React from 'react';

import { calculateDrag } from 'Containers/Editor/editorUtils';

import { Page } from 'Components';
import './Pages.scss';

export const Pages = props => {
    const { pages = {} } = props;

    const handleDrag = (e, type, styles, stickerRef, stickerId, pageId) => {
        const resizeOrRotate$ = calculateDrag(e, styles)
        resizeOrRotate$.subscribe(calculatedStyle => {
            props.updateSticker({calculatedStyle, type, stickerId, pageId})
        })
    }

    return (
        <div className="pages">
            {Object.keys(pages).map((key, index) =>
               <Page key={key} page={pages[key]} pageNo={index + 1} handleDrag={handleDrag} handleDropSticker={props.handleDropSticker} {...props} />
            )}
        </div>
    )
}
