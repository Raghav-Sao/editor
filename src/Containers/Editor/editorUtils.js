import { distinctUntilChanged, map, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

import { SVG_STICKER } from 'constant';

const defaultStopEvents$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'mouseup'));
const getScaledBoundingRect = (boundingRect, scale, pageId, pass,) => {
    if(pass) {
        return boundingRect;
    }
    const {left, right, top, bottom, width, height} = boundingRect;
    const {left: pageLeft, top: pageTop} = document.querySelector(`.page.${pageId}`).getBoundingClientRect();
    return {height: height * (1/scale), width: width * (1/scale), left: (left - pageLeft)*(1/scale), right: (right - pageTop )*(1/scale), top: (top-pageTop)*(1/scale), bottom: (bottom - pageTop)*(1/scale)}
}
const getLeftRightCord = (obj, type, getMax) => {
    const value = Object.keys(obj).reduce(
        (accumulator, key) => {
            
            const val = Number(obj[key][type]);
            if(getMax && val > accumulator) {
                accumulator = val
            }
            if(!getMax && val < accumulator) {
                accumulator = val
            }
            return accumulator
        },
        (getMax ? -Infinity : Infinity),
    );
    return value;
}
const filterValue = (matchedPoint, obj, type = 'vertical') => {
    const type1 = type === 'horizontal' ? 'l' : 't';
    const type2 = type === 'horizontal' ? 'r' : 'b';
    const minValue = getLeftRightCord(obj, type1, false);
    const maxValue = getLeftRightCord(obj, type2, true);
    if(type === 'horizontal') {
        return {x1: minValue, y1: matchedPoint, x2: maxValue, y2: matchedPoint};
    }
    return {x1: matchedPoint, y1: minValue, x2: matchedPoint, y2: maxValue};
}
const getDrawPoints = (cord, stickerId) => {
    const { vertical = {}, horizontal ={} } = cord;
    const drawPoints = [];
    const verticalPoints = Object.keys(vertical);
    const horizontalPoints = Object.keys(horizontal);
    verticalPoints.forEach(pointKey => {
        const keys = Object.keys(vertical[pointKey]);
        if(keys.length > 1 && keys.includes(String(stickerId))) {
            drawPoints.push(filterValue(Number(pointKey), vertical[pointKey], 'vertical'));
        }
    });
    horizontalPoints.forEach(pointKey => {
        const keys = Object.keys(horizontal[pointKey]);
        if(keys.length > 1 && keys.includes(String(stickerId))) {
            drawPoints.push(filterValue(Number(pointKey), horizontal[pointKey], 'horizontal'));
        }
    });
    return drawPoints;
}
const getMappedPostion = ({mappedCord: oldCord = {}, boundingRect, updatedBoundingRect, stickerId, pageId}) => {
    const {l: stickerL, t: stickerT, r:stickerR, b:stickerB} = updatedBoundingRect;
    const l = Number(stickerL.toFixed());
    const t = Number(stickerT.toFixed());
    const r = Number(stickerR.toFixed());
    const b = Number(stickerB.toFixed());
    
    const {l: oldL, t: oT, r: oR, b: oB} = boundingRect;
    const {vertical = {}, horizontal = {}} = oldCord;

    const {
        [oldL]: { [stickerId]:_1, ...restL} = {},
        [oR]: { [stickerId]:_3, ...restR} = {},
    } = vertical;
    const {
        [oT]: { [stickerId]:_2, ...restT} = {},
        [oB]: { [stickerId]:_4, ...restB} = {},
    } = horizontal;
    const updatedVetical = {
        ...vertical,
        [oldL]:   { ...restL },
        [oR]:   { ...restR }
    }
    const updatedHorizontal = {
        ...horizontal,
        [oT]:   { ...restT },
        [oB]:   { ...restB }
    }
   let filteredVertical = { ...updatedVetical };
   let filteredHorizontal = { ...updatedHorizontal};
    if(Object.keys(updatedVetical[oldL]).length === 0) {
        const {[oldL]:_, ...restUpdatedVertical}  = updatedVetical
        filteredVertical = {...restUpdatedVertical};
    }
    if(Object.keys(updatedHorizontal[oT]).length === 0) {
        const {[oT]:_, ...restUpdatedHorizontal}  = updatedHorizontal
        filteredHorizontal = {...restUpdatedHorizontal};
    }
    if(Object.keys(updatedVetical[oR]).length === 0) {
        const {[oR]:_, ...restUpdatedVertical}  = filteredVertical
        filteredVertical = {...restUpdatedVertical};
    }
    if(Object.keys(updatedHorizontal[oB]).length === 0) {
        const {[oB]:_, ...restUpdatedHorizontal}  = filteredHorizontal
        filteredHorizontal = {...restUpdatedHorizontal};
    }
    const mappedCord = {
        horizontal: {
            ...filteredHorizontal, 
            [t]: {
                ...horizontal[t],
                [stickerId]: {type: "top", l, b, r, t}
            },
            [b]: {
                ...horizontal[b],
                [stickerId]: {type: "bottom", l, b, r, t}
            }
        },
        vertical: {
            ...filteredVertical,
            [l]: {
                ...vertical[l],
                [stickerId]: {type: "left", l, b, r, t}
            },
            [r]: {
                ...vertical[r],
                [stickerId]: {type: "right", l, b, r, t}
            }
        }
    }
    return mappedCord;
}
const calculateResizeOrRotateStyles = params => {
    const {mappedCord, boundingRect, e, mouseX, mouseY, movemenetType, stickerRef, startX, startY, styles, stickerId, pageId, scale } = params;
    const {rotation :{rotation = 0} = {}, position: {left, top} = {}} = styles;
    const sticker = stickerRef.current;
    const {
        bottom,
        right,
        width,
        height,
        left: activeBoundingLeft,
        top: activeBoundingTop,
    } = sticker.getBoundingClientRect();
    const {left: pageLeft, top: pageTop} = document.querySelector(`.page.${pageId}`).getBoundingClientRect();
    const { offsetWidth } = sticker; /* todo:  check and make var name batter */
    e.stopPropagation();
    switch(movemenetType) {
        case 'DRAG': {
            debugger
            const translateX = (mouseX - startX)*(1/scale);
            const translateY = (mouseY - startY)*(1);
            const transform = stickerRef.current.style.transform;
            const beforeData = transform.split('translate(')[0];
            const afterData = transform.split('px')[0];
            stickerRef.current.style.transform = `${beforeData} translate(${translateX}px, ${translateY}px) ${afterData}`; /* todo: to get top after rotation before render */
            const {left: l, top: t, right: r, bottom: b} = getScaledBoundingRect(stickerRef.current.getBoundingClientRect(), scale, pageId);
            const {left1: pageL = 0, top1: pageT = 0} = document.querySelector(`.page.${pageId}`).getBoundingClientRect();
            const updatedBoundingRect = { l: Number((l - pageL).toFixed()), t: Number((t - pageT).toFixed()), r: Number((r  - pageL).toFixed()), b: Number((b - pageT).toFixed()) };
            const updatedMappedCord = getMappedPostion({mappedCord, boundingRect, updatedBoundingRect, stickerId, pageId});
            const drawPoints = getDrawPoints(updatedMappedCord, stickerId);
            return {
                mappedCord: updatedMappedCord,
                boundingRect: updatedBoundingRect,
                translateX,
                translateY,
                stickerRef, /* todo: why sending ref */
                drawPoints,
            };

        }
        case 'leftResize':
        case 'rightResize': {
            const { left: handlerLeft, top: handlerTop } =
                movemenetType === 'rightResize'
                    ? document.querySelector('.sticker.active #handle-right').getBoundingClientRect()
                    : document.querySelector('.sticker.active #handle-left').getBoundingClientRect();
            const rad = rotation || 0;
            debugger
            const y = (mouseY - handlerTop) * (mouseY - handlerTop);
            const x = (mouseX - handlerLeft) * (mouseX - handlerLeft);
            const slop = Math.atan((mouseY - handlerTop) / (mouseX - handlerLeft));
            let diff = Math.sqrt(x + y);
            diff = diff * Math.cos(slop - (rad * Math.PI) / 180) * (mouseX > handlerLeft ? 1 : -1);
            if (isNaN(diff)) {
                return { width, left, diff: 0, leftDiff: 0, topDiff: 0 };
            }
            diff = movemenetType === 'leftResize' ? -diff : diff;
            if (diff + offsetWidth < 2) {
                /* coz rotated getBoundingClientRect may be differ */
                diff = 20 - offsetWidth;
            }
            const extraLeftDiff = movemenetType === 'leftResize' ? diff * Math.cos((rad * Math.PI) / 180) : 0;
            const extraTopDiff = movemenetType === 'leftResize' ? diff * Math.sin((rad * Math.PI) / 180) : 0;
            let leftDiff = diff / 2 - (Math.cos((rad * Math.PI) / 180) * diff) / 2 + extraLeftDiff;
            let topDiff = (Math.sin((rad * Math.PI) / 180) * diff) / 2 - extraTopDiff;

            const beforeHeight = stickerRef.current.offsetHeight;
            stickerRef.current.style.width = `${stickerRef.current.offsetWidth + diff}px`;
            stickerRef.current.style.left = stickerRef.current.offsetLeft - leftDiff;
            stickerRef.current.style.top = stickerRef.current.offsetTop + topDiff;
            const afterHeight = stickerRef.current.offsetHeight;
            const heightDiff = afterHeight - beforeHeight;
            if (heightDiff !== 0) {
                const extratDiff = (heightDiff / 2) * Math.cos((rad * Math.PI) / 180) - heightDiff / 2;
                const extralDiff = (heightDiff / 2) * Math.sin((rad * Math.PI) / 180);
                leftDiff += extralDiff;
                topDiff += extratDiff;
            }
            
            const updateLeft = stickerRef.current.offsetLeft - leftDiff;
            const updatedTop = stickerRef.current.offsetTop + topDiff;
            const updatedWidth = stickerRef.current.offsetWidth;
            const {left: l, top: t, right: r, bottom: b} = getScaledBoundingRect(stickerRef.current.getBoundingClientRect(), scale, pageId);
            const {left1: pageL = 0, top1: pageT = 0} = document.querySelector(`.page.${pageId}`).getBoundingClientRect();
            const updatedBoundingRect = { l: Number((l - pageL).toFixed()), t: Number((t - pageT).toFixed()), r: Number((r  - pageL).toFixed()), b: Number((b - pageT).toFixed()) };
            const updatedMappedCord = getMappedPostion({mappedCord, boundingRect, updatedBoundingRect, stickerId, pageId});
            const drawPoints = getDrawPoints(updatedMappedCord, stickerId);
            return { drawPoints, mappedCord: updatedMappedCord, boundingRect: updatedBoundingRect, position: {left: updateLeft, top:updatedTop}, diff, leftDiff, offsetWidth, topDiff, bottom, top: updatedTop, right, width: updatedWidth };
        }
        case 'rotation': {
            const centerX = activeBoundingLeft +  width/ 2,
                centerY = activeBoundingTop + height / 2,
                base = mouseX - centerX,
                hypotenuse = mouseY - centerY,
                deg = -Math.round((Math.atan2(base, hypotenuse) * 180) / Math.PI),
                rotation = deg,//Math.abs(deg) < 3 ? 0 : deg, why was this condition?
                transform = stickerRef.current.style.transform,
                beforeData = transform.split('rotate(')[0],
                afterData = transform.split('deg)')[1];
            stickerRef.current.style.transform = `${beforeData} rotate(${deg}deg) ${afterData}`; /* todo: to get top after rotation before render */
            const {left1: pageL = 0, top1: pageT = 0} = document.querySelector(`.page.${pageId}`).getBoundingClientRect();
            const {left: l, top: t, right: r, bottom: b} = getScaledBoundingRect(stickerRef.current.getBoundingClientRect(), scale, pageId);
            const updatedBoundingRect = { l: Number((l - pageL).toFixed()), t: Number((t - pageT).toFixed()), r: Number((r  - pageL).toFixed()), b: Number((b - pageT).toFixed()) };
            const updatedMappedCord = getMappedPostion({mappedCord, boundingRect, updatedBoundingRect, stickerId, pageId});
            const drawPoints = getDrawPoints(updatedMappedCord, stickerId);
            return {
                mappedCord: updatedMappedCord,
                rotation: {rotation,  unit: 'deg'},
                bottom,
                top: getScaledBoundingRect(stickerRef.current.getBoundingClientRect(), scale, pageId).top + window.scroll,
                right,
                left,
                position: { left, top },
                boundingRect: updatedBoundingRect,
                drawPoints,
            };
        }

        default: {
            return {}
        }   
    }

    
};

export const calculateMovement = ({mappedCord, boundingRect, e,styles={}, stopEvents$ = defaultStopEvents$, stickerRef, movemenetType, stickerId, pageId, scale}) => {
    
    const { touches: { 0: { pageX: touchPageX, pageY: touchPageY } = {} } = [] } = e;
    const { pageX = touchPageX, pageY = touchPageY } = e;
    const { translate: { translateX: lastOffsetX = 0, translateY: lastOffsetY = 0 } = {} } = styles;
    const startX = pageX - lastOffsetX*scale;
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
            const { touches: { 0: { pageX: touchMouseX, pageY: touchMouseY } = {} } = [] } = e;
            const { clientX: mouseX = touchMouseX, clientY: mouseY = touchMouseY } = e;
            const temp = {
                e,
                mouseX,
                mouseY,
                movemenetType,
                startX,
                startY,
                stickerRef, /* todo: why sending ref */
                styles,
                mappedCord,
                boundingRect,
                stickerId,
                pageId,
                scale,
            };
            return temp;
        }),
        map(calculateResizeOrRotateStyles),
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
    const { translate: { translateX = 0, translateY = 0 } = {}, rotation: { unit = 'deg', rotation = 0 } = {} } = param;
    const data = `translate(${translateX}px, ${translateY}px) rotate(${rotation}${unit})`;
    return data;
};

export const calculateNewStickerData = data => {
    const { left, styles, top, type, pageId, resource } = data;

    const calculateStyles = {
        ...styles,
        position: {
            left,
            top,
        },
        translate: {
            translateX: 0,
            translateY: 0,
        },
        rotation: {
            unit: 'deg',
            rotation: 0,
        },
    };
    if (type === SVG_STICKER) {
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
        },
    };
    return sticker;
};

export const calculateStyleChanges = (activityInfo) => {
    const {action, activePageId: pageId, activeSticker: {id: stickerId, styles: oldStyle} = {}, styles, pages } = activityInfo;
   
    if (['TEXT_FONT_CHANGE', 'TEXT_STYLE_CHANGE', 'STYLE_CHANGE'].indexOf(action) > -1) {
        const calculatedStyle = { ...oldStyle, ...styles };
        return {calculatedStyle, id: stickerId, pageId}
    }
    else if (action === 'SAVE') {
        /* todo: save to backend */
    }   
}