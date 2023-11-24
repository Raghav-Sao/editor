import React from 'react';
import { useDrag } from 'react-dnd';

import { SVG_STICKER } from 'constant';

import './Style.scss';

const ImageToolbar = props => {
    const {
        sticker: { id, style, resource },
    } = props;

    const [{ isDragging }, drag] = useDrag({
        type: SVG_STICKER,
        item: { type: SVG_STICKER, resource, style },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div className="image__toolbar" onMouseDown={props.handleDrag} ref={drag}>
            <div
                dangerouslySetInnerHTML={{ __html: resource }}
                key={id}
                className={isDragging ? 'visibility--hidden' : 'visible--smoothly'}
            />
        </div>
    );
};

export default ImageToolbar;
