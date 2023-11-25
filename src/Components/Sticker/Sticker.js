import React, { useRef } from 'react';
import { getStyle } from 'Containers/Editor/editorUtils';
import { TEXT_STICKER, SVG_STICKER } from 'constant';
import { IF } from 'Components';
import './Sticker.scss';

export const Sticker = props => {
    const stickerRef = useRef(null);
    
    
    /* Todo: make it in state if make sence
    isRotating: false,
    isDragging: false,
    isResizing: false
    */
    
    const {
        sticker: { type, id: stickerId, resource, isEditable = false, styles },
        page: { id: pageId },
        activeStickerId,
        activePageId,
        handleDrag,
        
    } = props;
    const showTextSticker = type === TEXT_STICKER;
    const showSVGSticker = type === SVG_STICKER;
    
    return (
        <div
            class={`sticker ${type} ${pageId === activePageId && activeStickerId === stickerId ? 'active': ''}`}
            style={getStyle(styles)}
            onMouseDown={e => handleDrag(e, 'DRAG', styles, stickerRef, stickerId, pageId)} /* Todo: use id from key and make better for isRotating true event */
            onTouchStart={e => handleDrag(e, 'DRAG', styles, stickerRef, stickerId, pageId)}
            onMouseUp={e => handleDrag(e, 'END_DRAG', styles, stickerRef, stickerId, pageId)} /* Todo: use id from key and make better for isRotating true event */
            ref={stickerRef}
        >
            <IF condition={showSVGSticker}>
                <div key={stickerId} className={`sticker__image ${isEditable ? 'editable' : ''}`}>
                    <div dangerouslySetInnerHTML={{ __html: resource }} key={stickerId} />
                </div>
            </IF>
            <IF condition={showTextSticker}>
                <div contenteditable="true">{resource}</div>
            </IF>
            <div
                    className="h-l"
                    onMouseDown={e => handleDrag(e, 'leftResize', styles, stickerRef, stickerId, pageId)}
                    onTouchStart={e => handleDrag(e, 'leftResize', styles, stickerRef, stickerId, pageId)}
                >
                    <span id="handle-left" />
                </div>
                <div
                    className="h-r"
                    onMouseDown={e => handleDrag(e, 'rightResize', styles, stickerRef, stickerId, pageId)}
                    onTouchStart={e => handleDrag(e, 'rightResize', styles, stickerRef, stickerId, pageId)}
                >
                    <span id="handle-right" />
                </div>
                <div
                    className="handle rotate"
                    onMouseDown={e => handleDrag(e, 'rotate', styles, stickerRef, stickerId, pageId)}
                    onTouchStart={e => handleDrag(e, 'rotate', styles, stickerRef, stickerId, pageId)}
                /> {/* todo: move icon for rotated */}
        </div>
    );
};
