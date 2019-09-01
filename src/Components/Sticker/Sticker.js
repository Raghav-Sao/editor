import React, { PureComponent, Fragment } from 'react';

import { IF } from 'Components';
import { TEXT, SVG } from 'constant';

export class Sticker extends PureComponent {
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
                type, id, resource, isEditable = false, styles
            }
        } = this.props;

        const showTextSticker = type === TEXT;
        const showSVGSticker = type === SVG;

        return (
            <div class={`sticker ${type}`} style={this.getStyle(styles)}>
                <IF condition={showSVGSticker}>
                    <div key={id} className={`sticker__image ${isEditable ? 'editable' : ''}`}>
                        <div dangerouslySetInnerHTML={{ __html: resource }} key={id} />
                    </div>
                </IF>
                <IF condition={showTextSticker}>
                    <div>{resource}</div>
                </IF>
            </div>
        )
    }
}
