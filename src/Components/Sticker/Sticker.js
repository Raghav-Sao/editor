import React, { createRef, PureComponent } from 'react';

import { IF } from 'Components';
import { TEXT, SVG } from 'constant';

export class Sticker extends PureComponent {
    constructor(props) {
        super(props);
        this.stickerRef = createRef();
        this.state = {
            // Todo: make it in state if make sence
            isRotating: false,
            isDragging: false,
            isResizing: false,
        };
    }

    getStyle = ({
        color,
        fontSize,
        fontWeight,
        position: { left, top },
        width,
        height,
        textAlign = 'center',
        fontStyle,
        translate,
        rotation,
    }) => ({
        textAlign,
        fontStyle,
        color,
        fontSize,
        fontWeight,
        height,
        left,
        position: 'absolute',
        top,
        width,
        transform: this.getTransformData({ translate, rotation }),
        fill: color,
    });
    getTransformData = ({ translate: { translateX = 0, translateY = 0 }, rotation: { unit, rotation } }) => {
        // console.log(unit)
        const data = `translate(${translateX}px, ${translateY}px) rotate(${rotation}${unit})`;
        return data;
    };
    render() {
        const { 
            sticker : {
                type, id: stickerId, resource, isEditable = false, styles
            },
            page: { id: pageId},
            handleDrag,
        } = this.props;

        const showTextSticker = type === TEXT;
        const showSVGSticker = type === SVG;
        return (
            <div 
                class={`sticker ${type}`}
                style={this.getStyle(styles)}
                onMouseDown={e => handleDrag(e, 'drag', styles, this.stickerRef, stickerId, pageId)} // Todo: use id from key and make better for isRotating true event
                onTouchStart={e => handleDrag(e, 'drag', styles, this.stickerRef, stickerId, pageId)}
                ref={this.stickerRef}
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
        )
    }
}
