import React, { useState } from 'react';

import { calculateMovement } from 'Containers/Editor/editorUtils';

import { Page } from 'Components';
import './Pages.scss';

export const Pages = props => {
    let activeMovementType = null; /* todo: handle it batter */
    const { pages = {}} = props;

    const handleDrag = (e, type, styles, stickerRef, stickerId, pageId) => {
        console.log(type)
        if(type=== 'END_DRAG') {
            activeMovementType = null;
            props.updateActiveStickerId({stickerId, pageId});
            return
        }
        if(activeMovementType && type !== activeMovementType) {
            console.log("returning movement ttype:", {type, activeMovementType})
            return;
        }
        if(activeMovementType === null) {
            activeMovementType = type;
        }

        const resizeOrRotate$ = calculateMovement({e, styles, stickerRef, movemenetType: type});
        resizeOrRotate$.subscribe(calculatedStyle => {
            props.updateSticker({ calculatedStyle, type, id: stickerId, pageId });
        });
    };

    return (
        <div className="pages">
            {Object.keys(pages).map((key, index) => (
                <Page
                    key={key}
                    page={pages[key]}
                    pageNo={index + 1}
                    handleDrag={handleDrag}
                    handleDropSticker={props.handleDropSticker}
                    {...props}
                />
            ))}
        </div>
    );
};
