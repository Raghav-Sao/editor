import { distinctUntilChanged, map, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

import { SVG_STICKER } from 'constant';

const defaultStopEvents$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'mouseup'));

const calculateResizeOrRotateStyles = params => {
    const { e, mouseX, mouseY, movemenetType, stickerRef, startX, startY, styles } = params;
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
    const { offsetWidth } = sticker; /* todo:  check and make var name batter */
    e.stopPropagation();
    switch(movemenetType) {
        case 'DRAG': {
            const translateX = mouseX - startX;
            const translateY = mouseY - startY;
        
            return {
                translateX,
                translateY,
                stickerRef /* todo: why sending ref */
            };

        }
        case 'leftResize':
        case 'rightResize': {
            const { left: l, top: t } =
                movemenetType === 'rightResize'
                    ? document.querySelector('.sticker.active #handle-right').getBoundingClientRect()
                    : document.querySelector('.sticker.active #handle-left').getBoundingClientRect();
            const rad = rotation || 0;
            const y = (mouseY - t) * (mouseY - t);
            const x = (mouseX - l) * (mouseX - l);
            const slop = Math.atan((mouseY - t) / (mouseX - l));
            let diff = Math.sqrt(x + y);
            diff = diff * Math.cos(slop - (rad * Math.PI) / 180) * (mouseX > l ? 1 : -1);
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
            const updatedWidth = stickerRef.current.style.width
            return { position: {left: updateLeft, top:updatedTop}, diff, leftDiff, offsetWidth, topDiff, bottom, top: updatedTop, right, width: updatedWidth };
        }
        case 'rotate': {
            const centerX = activeBoundingLeft +  width/ 2,
                centerY = activeBoundingTop + height / 2,
                base = mouseX - centerX,
                hypotenuse = mouseY - centerY,
                deg = -Math.round((Math.atan2(base, hypotenuse) * 180) / Math.PI),
                rotation = Math.abs(deg) < 3 ? 0 : deg,
                transform = stickerRef.current.style.transform,
                beforeData = transform.split('rotate(')[0],
                afterData = transform.split('deg)')[1];
            stickerRef.current.style.transform = `${beforeData} rotate(${deg}deg) ${afterData}`; /* todo: to get top after rotation before render */
            return {
                rotation: {rotation,  unit: 'deg'},
                bottom,
                top: stickerRef.current.getBoundingClientRect().top + window.scrollY,
                right,
                left,
                position: { left, top },
                width,
            };
        }

        default: {
            return {}
        }   
    }

    
};

export const calculateMovement = ({e,styles={}, stopEvents$ = defaultStopEvents$, stickerRef, movemenetType}) => {
    const { touches: { 0: { pageX: touchPageX, pageY: touchPageY } = {} } = [] } = e;
    const { pageX = touchPageX, pageY = touchPageY } = e;
    const { translate: { translateX: lastOffsetX = 0, translateY: lastOffsetY = 0 } = {} } = styles;
    const startX = pageX - lastOffsetX;
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
                styles
            };
            return temp;
        }),
        map(calculateResizeOrRotateStyles),
        distinctUntilChanged()
    );
    return resizeOrRotate$;

}


export const calculateDrag = ({e, styles = {}, movemenetType, stopEvents$ = defaultStopEvents$}) => {
    const { touches: { 0: { pageX: touchPageX, pageY: touchPageY } = {} } = [] } = e;
    const { pageX = touchPageX, pageY = touchPageY } = e;

    const { translate: { translateX: lastOffsetX = 0, translateY: lastOffsetY = 0 } = {} } = styles;

    const startX = pageX - lastOffsetX;
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
                mouseX,
                mouseY,
                movemenetType,
                e,
                startX,
                startY,
            };
            return temp;
        }),
        map(calculateResizeOrRotateStyles),
        distinctUntilChanged()
    );

    return resizeOrRotate$;
};

export const calculateRoatation = (e, styles = {}, stopEvents$ = defaultStopEvents$) => {
    const { touches: { 0: { pageX: touchPageX, pageY: touchPageY } = {} } = [] } = e;
    const { pageX = touchPageX, pageY = touchPageY } = e;

    const { translate: { translateX: lastOffsetX = 0, translateY: lastOffsetY = 0 } = {} } = styles;

    const startX = pageX - lastOffsetX;
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
                mouseX,
                mouseY,
                e,
                startX,
                startY,
            };
            return temp;
        }),
        map(calculateResizeOrRotateStyles),
        distinctUntilChanged()
    );

    return resizeOrRotate$;
};

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
    debugger
    const {action, activePageId: pageId, activeSticker: {id: stickerId, styles: oldStyle} = {}, styles, pages } = activityInfo;
   
    if (['TEXT_FONT_CHANGE', 'TEXT_STYLE_CHANGE', 'STYLE_CHANGE'].indexOf(action) > -1) {
        const calculatedStyle = { ...oldStyle, ...styles };
        return {calculatedStyle, id: stickerId, pageId}
    }
    else if (action === 'SAVE') {
        /* todo: save to backend */
    }   
}