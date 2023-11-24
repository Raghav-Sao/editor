import React from 'react';
import { useDrag } from 'react-dnd';

import { TEXT_STICKER } from 'constant';

import './Style.scss';

const TextToolbar = props => {
    const {
        sticker: { id, styles, resource },
    } = props;

    const [{ isDragging }, drag] = useDrag({
        type: TEXT_STICKER,
        item: { type: TEXT_STICKER, resource, styles },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div className="text__toolbar" onMouseDown={props.handleDrag} ref={drag} style={styles}>
            <div key={id} className={isDragging ? 'visibility--hidden' : ''}>
                {resource}
            </div>
        </div>
    );
};

export default TextToolbar;
