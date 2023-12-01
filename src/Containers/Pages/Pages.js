import React, { useState } from 'react';

import { calculateMovement } from 'Containers/Editor/editorUtils';

import { Page } from 'Components';
import './Pages.scss';

export const Pages = props => {
    let activeMovementType = null; /* todo: handle it batter */
    const [activeType, setActiveType] = useState(null);
    const { pages = {}, pages: {activeSticker: {id: activeStickerId} = {}} = {}} = props;

    const handleDrag = (e, type, styles, stickerRef, stickerId, pageId) => {
        console.log(process.env.NODE_BUILD_FLAGS, process.env.GENERATE_SOURCEMAP, typeof(GENERATE_SOURCEMAP), "env")
        if(type=== 'END_DRAG') {
            activeMovementType = null;
            setActiveType(null);
            props.updateActiveStickerId({stickerId, pageId});
            return
        }
        if(activeMovementType && type !== activeMovementType) {
            console.log("returning movement type:", {type, activeMovementType})
            return;
        }
        if(activeMovementType === null) {
            activeMovementType = type;
            setActiveType(type);
        }
        const {[pageId]:{stickers: {[stickerId]: {boundingRect = {} } = {}}, mappedCord = {}} = {}} = pages;
        const resizeOrRotate$ = calculateMovement({pageId, stickerId, mappedCord, boundingRect,  e, styles, stickerRef, movemenetType: type});
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
                    activeMovementType={activeType}
                    activeStickerId={activeStickerId}
                    handleDropSticker={props.handleDropSticker}
                    {...props}
                />
            ))}
        </div>
    );
};
