export const calculateRelativeDragPosition = (monitor, pageRef) => {
    const { x: clientX, y: clientY } = monitor.getClientOffset();
    const { x: sourceX, y: sourceY } = monitor.getInitialSourceClientOffset();
    const { x: initialClientX, y: initialClientY } = monitor.getInitialClientOffset();
    const dragStartX = clientX - initialClientX + sourceX;
    const dragStartY = clientY - initialClientY + sourceY;
    const { x: dropStartX, y: dropStartY } = pageRef.current.getBoundingClientRect();
    const left = dragStartX - dropStartX;
    const top = dragStartY - dropStartY;
    return [left, top];
};
