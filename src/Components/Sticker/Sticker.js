import React, { useRef, useCallback } from 'react';
import { getStyle } from 'Containers/Editor/editorUtils';
import { TEXT_STICKER, SVG_STICKER } from 'constant';
import { IF } from 'Components';
import _debounce from 'lodash/debounce'
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
        handleTextChanges,
        activeMovementType
    } = props;

    const updateTextChanges = (payload) => {
        handleTextChanges(payload);
    }
    const debounceFn = useCallback(_debounce(updateTextChanges, 1000), []);
    const  handleChange = (event) => {
        debounceFn({text: event.target.innerText, activePageId, activeStickerId});
    };
    const showTextSticker = type === TEXT_STICKER;
    const showSVGSticker = type === SVG_STICKER;
    
    const stylingText = {
        'rotation': styles?.rotation?.rotation + '°',
        'leftResize': `W: ${styles?.width}`,
        'rightResize': `W: ${styles?.width}`
    }
    const getCursoreStyle = ({rotation: {rotation = 0} = {}}) => {
        if(rotation < 0) {
            rotation = rotation +180
        }
        if(rotation > 0 && rotation <15) {
            return 'ew-resize'
        }
        if(rotation >= 15 && rotation <=75) {
            return 'nwse-resize';
        }
        if(rotation > 75 && rotation < 105) {
            return 'ns-resize';
        }
        if(rotation >= 105 && rotation <=165) {
            return 'nesw-resize'
        }
        return 'ew-resize'
    }
    return (
        
        <div
            class={`sticker ${type} ${activeMovementType ? 'movementFlag' : ''}  ${pageId === activePageId && activeStickerId === stickerId ? 'active': ''}`}
            style={getStyle(styles)}
            onMouseDown={e => handleDrag(e, 'DRAG', styles, stickerRef, stickerId, pageId)} /* Todo: use id from key and make better for isRotating true event */
            onTouchStart={e => handleDrag(e, 'DRAG', styles, stickerRef, stickerId, pageId)}
            onMouseUp={e => handleDrag(e, 'END_DRAG', styles, stickerRef, stickerId, pageId)} /* Todo: use id from key and make better for isRotating true event */
            ref={stickerRef}
        >
            <IF condition={showSVGSticker}>
                <div data-content={stylingText[activeMovementType]} key={stickerId} className={`sticker__image ${isEditable ? 'editable' : ''}`}>
                    <div dangerouslySetInnerHTML={{ __html: resource }} key={stickerId} />
                </div>
            </IF>
            <IF condition={showTextSticker}>
                <div data-content={stylingText[activeMovementType]} className="sticker__text" contenteditable="true">{resource}</div>
            </IF>
            <div
                    className="h-l"
                    onMouseDown={e => handleDrag(e, 'leftResize', styles, stickerRef, stickerId, pageId)}
                    onTouchStart={e => handleDrag(e, 'leftResize', styles, stickerRef, stickerId, pageId)}
                    style={{cursor: getCursoreStyle(styles)}}
                >
                    <span id="handle-left" />
            </div>
            <div
                className="h-r"
                onMouseDown={e => handleDrag(e, 'rightResize', styles, stickerRef, stickerId, pageId)}
                onTouchStart={e => handleDrag(e, 'rightResize', styles, stickerRef, stickerId, pageId)}
                style={{cursor: getCursoreStyle(styles)}}
            >
                <span id="handle-right" />
            </div>
            <div
                className="handle rotate"
                onMouseDown={e => handleDrag(e, 'rotation', styles, stickerRef, stickerId, pageId)}
                onTouchStart={e => handleDrag(e, 'rotation', styles, stickerRef, stickerId, pageId)}
                
            /> {/* todo: move icon for rotated */}
        </div>
    );
};
