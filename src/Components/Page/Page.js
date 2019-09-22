import React from 'react';
import { useDrop } from 'react-dnd';

import { IMAGE, TEXT_STICKER, SVG_STICKER } from 'constant';
import { calculateNewStickerData } from 'Containers/Editor/editorUtils';
import { calculateRelativeDragPosition } from './pageUtils';

import { BorderGuide, IF, PageInfo } from 'Components';
import { Stickers } from 'Containers';
import './Page.scss';

export const Page = (props) => {
    const pageRef = React.createRef();
    const { page = {}, showBorderGuide = false, pageNo } = props;

    const { pageWidth, background, name, id: pageId } = page;
    const { backgroundType, backgroundImage } = background;
    const showBackgroundImage = backgroundType === IMAGE;

    const [, drop] = useDrop({
        accept: [TEXT_STICKER, SVG_STICKER],
        drop: (item, monitor) => {
            const [left, top] = calculateRelativeDragPosition(monitor, pageRef);
            const { type, resource, styles } = monitor.getItem();
            const newStickerData = calculateNewStickerData({left, pageId, resource,  styles, top, type});        
            props.handleDropSticker(newStickerData);            
        },
        // collect: monitor => ({
        //     isOver: !!monitor.isOver(),
        //     canDrop: !monitor.canDrop(),
        //     getSourceClientOffset: monitor.getSourceClientOffset,
        //     getInitialClientOffset: monitor.getInitialClientOffset,
        //     getInitialSourceClientOffset: monitor.getInitialSourceClientOffset,
        //     getClientOffset: monitor.getClientOffset,
        // }) // check is Really Required? or can we write drop calculation here
    })

    return (
        <div className="page--wrapper">
            <PageInfo pageInfo={`Page ${pageNo}`} />
            <div className="page content--row " ref={drop}>
                <IF condition={showBackgroundImage}>
                    <img alt="img" src={backgroundImage} draggable="false" width="100%" ref={pageRef} />
                </IF>
                <IF condition={showBorderGuide}>
                    <BorderGuide pageWidth={pageWidth}/>
                </IF>
                <Stickers {...props} />
            </div>
        </div>
    )
}
