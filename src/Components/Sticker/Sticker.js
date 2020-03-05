import React, { createRef, PureComponent } from 'react';

import { getStyle } from 'Containers/Editor/editorUtils';
import { TEXT_STICKER, SVG_STICKER } from 'constant';

import { IF } from 'Components';

export const Sticker = props => {
    const stickerRef = createRef();
    // Todo: make it in state if make sence
    // isRotating: false,
    // isDragging: false,
    // isResizing: false
    const {
        sticker: { type, id: stickerId, resource, isEditable = false, styles },
        page: { id: pageId },
        handleDrag,
    } = props;
    const showTextSticker = type === TEXT_STICKER;
    const showSVGSticker = type === SVG_STICKER;
    return (
        <div
            class={`sticker ${type}`}
            style={getStyle(styles)}
            onMouseDown={e => handleDrag(e, 'drag', styles, stickerRef, stickerId, pageId)} // Todo: use id from key and make better for isRotating true event
            onTouchStart={e => handleDrag(e, 'drag', styles, stickerRef, stickerId, pageId)}
            ref={stickerRef}
        >
            <IF condition={showSVGSticker}>
                <div key={stickerId} className={`sticker__image ${isEditable ? 'editable' : ''}`}>
                    <div dangerouslySetInnerHTML={{ __html: resource }} key={stickerId} />
                </div>
            </IF>
            <IF condition={showTextSticker}>
                <div>{resource}</div>
            </IF>
        </div>
    );
};
