import { distinctUntilChanged, map, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

const defaultStopEvents$ = merge(fromEvent(document, 'touchend'), fromEvent(document, 'mouseup'));

const calculatedDrag  = params => {
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

export const handleDrag = (e, styles, stopEvents$ = defaultStopEvents$ ) => {
    const { touches: { 0: { pageX: touchPageX, pageY: touchPageY } = {} } = []} = e;
    const { pageX = touchPageX, pageY = touchPageY } = e;
    
    const { translate: { translateX: lastOffsetX, translateY: lastOffsetY } = {} } = styles;

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
        map(calculatedDrag),
        distinctUntilChanged()
    );

    return resizeOrRotate$;
} 
