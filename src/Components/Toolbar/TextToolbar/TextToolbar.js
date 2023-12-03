import React from 'react';
import { useDrag } from 'react-dnd';

import { TEXT_STICKER } from 'constant';

import './Style.scss';

const TextToolbar = props => {
    const {
        sticker: { id, styles, resource },
        handleAddSticker,
        setShowDetails,
    } = props;

    const [{ isDragging }, drag] = useDrag({
        type: TEXT_STICKER,
        item: { type: TEXT_STICKER, resource, styles },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const onAddSticker = () => {
        setShowDetails(false);
        handleAddSticker({ type: TEXT_STICKER, resource, styles })
    }

    return (
        <div className="text__toolbar" ref={drag} style={styles} onClick={onAddSticker}>
            <div key={id} className={isDragging ? 'visibility--hidden' : ''}>
                {resource}
            </div>
        </div>
    );
};

export default TextToolbar;
