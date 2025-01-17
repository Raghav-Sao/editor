import React, { useState } from 'react';

import { calculateMovement } from 'Containers/Editor/editorUtils';

import { Page } from 'Components';
import './Pages.scss';
export const Pages = props => {
    let activeMovementType = null; /* todo: handle it batter */
    const [activeType, setActiveType] = useState(null);
    const { scale, pages = {}, activeStickerId, pages: {activeSticker: {id: activeStickerIdd} = {}} = {}} = props;

    const handleDrag = (e, type, styles, stickerRef, stickerId, pageId) => {
        console.log({type, activeType, stickerId, activeStickerId})
        if(type=== 'END_DRAG') {
            activeMovementType = null;
            setActiveType(null);
            if(activeType === 'DRAG') {
                props.updateActiveStickerId({stickerId, pageId});
            }
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
        const resizeOrRotate$ = calculateMovement({pageId, stickerId, mappedCord, boundingRect,  e, styles, stickerRef, movemenetType: type, scale});
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

/*
const ref = useRef({
    activeMovementType: null
});
const [activeType, setActiveType] = useState(null);
const { scale, pages = {}, pages: {activeSticker: {id: activeStickerId} = {}} = {}} = props;

const handleDrag = (e, type, styles, stickerRef, stickerId, pageId) => {
    if(type=== 'END_DRAG') {
        if(ref?.current?.activeMovementType === 'DRAG') {
            props.updateActiveStickerId({stickerId, pageId});
        }
        ref.current.activeMovementType = null;
        setActiveType(null);
        return
    }
    if(ref?.current?.activeMovementType && type !== ref?.current?.activeMovementType) {
        return;
    }
    if(ref?.current?.activeMovementType === null ) {
        ref.current.activeMovementType = type;
        setActiveType(type);
    }
    const {[pageId]:{stickers: {[stickerId]: {boundingRect = {} } = {}}, mappedCord = {}} = {}} = pages;
    const resizeOrRotate$ = calculateMovement({pageId, stickerId, mappedCord, boundingRect,  e, styles, stickerRef, movemenetType: type, scale});
    resizeOrRotate$.subscribe(calculatedStyle => {
        props.updateSticker({ calculatedStyle, type, id: stickerId, pageId });
    });
};
*/