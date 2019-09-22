import { distinctUntilChanged, map, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

import {SVG_STICKER} from 'constant';

const defaultStopEvents$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'mouseup'));

const calculatedDragDiff  = params => {
    const { e, mouseX, mouseY, startX, startY } = params;

    e.stopPropagation();
    // const { touches: { 0: { pageX: touchPageX, pageY: touchPageY } = {} } = []} = e;
    // const { pageX = touchPageX, pageY = touchPageY } = e;
    const translateX = mouseX - startX;
    const translateY = mouseY - startY;

    return {
        translateX,
        translateY,
    };
       
};

export const calculateDrag = (e, styles = {}, stopEvents$ = defaultStopEvents$) => {
    const { touches: { 0: { pageX: touchPageX, pageY: touchPageY } = {} } = []} = e;
    const { pageX = touchPageX, pageY = touchPageY } = e;
    
    const { translate: { translateX: lastOffsetX = 0, translateY: lastOffsetY = 0 } = {} } = styles;

    const  startX = pageX - lastOffsetX;
    const startY = pageY - lastOffsetY;
    const resizeOrRotate$ = merge(fromEvent(document, 'touchmove'), fromEvent(document, 'mousemove')).pipe(
        takeUntil(
            stopEvents$.pipe(
                tap(() => {
                    // this.m = NaN;
                    // this.stopEvents({ state });
                })
            )
        ),
        throttleTime(100),
        map(e => {
            const { touches: { 0: { pageX: touchMouseX, pageY: touchMouseY } = {} } = []} = e;
            const { clientX: mouseX = touchMouseX, clientY: mouseY = touchMouseY } = e;
            const temp = {
                mouseX,
                mouseY,
                e,
                startX,
                startY,
            };
            return temp;
        }),
        map(calculatedDragDiff),
        distinctUntilChanged()
    );

    return resizeOrRotate$;
} 


export const getStyle = ({
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
    transform: getTransformData({ translate, rotation }),
    fill: color,
});

export const getTransformData = (param = {}) => {
    const { translate: { translateX = 0, translateY = 0 } = {}, rotation: { unit = 'deg', rotation = 0 } = {}} = param;
    const data = `translate(${translateX}px, ${translateY}px) rotate(${rotation}${unit})`;
    return data;
};

export const calculateNewStickerData = data => {
    const { left, styles, top, type, pageId, resource } = data;

    const calculateStyles =  {
        ...styles,
        position: {
            left,
            top,
        },
        translate: {
            translateX: 0,
            translateY: 0
        },
        rotation: {
            unit: 'deg',
            rotation: 0
        },
    };
    if(type === SVG_STICKER) {
        calculateStyles['width'] = 136;
    }
    const sticker = {
        pageId,
        sticker: {
            _id: Date.now(),
            id: Date.now(),
            type,
            resource,
            styles: calculateStyles,
        }
    }
    return sticker;
}