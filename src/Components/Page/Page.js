import React, {useState} from 'react';
import { useDrop } from 'react-dnd';
import { Placeholder } from 'semantic-ui-react';
import { IMAGE, TEXT_STICKER, SVG_STICKER } from 'constant';
import { calculateNewStickerData } from 'Containers/Editor/editorUtils';
import { calculateRelativeDragPosition } from './pageUtils';

import { BorderGuide, IF, PageInfo } from 'Components';
import { Stickers } from 'Containers';
import './Page.scss';

export const Page = props => {
    const pageRef = React.createRef();
    const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
    const { scale, page = {}, showBorderGuide = true, pageNo, activeStickerId, activeMovementType = null } = props;

    const { drawPoints, background = {}, id: pageId } = page;
    const { backgroundType, backgroundImage } = background;
    const showBackgroundImage = backgroundType === IMAGE;
    
    const width= scale*681 + 'px';
    const height= scale*400 + 'px';
    const [, drop] = useDrop({
        accept: [TEXT_STICKER, SVG_STICKER],
        drop: (item, monitor) => {
            const [left, top] = calculateRelativeDragPosition(monitor, pageRef);
            const { type, resource, styles } = monitor.getItem();
            const newStickerData = calculateNewStickerData({ left, pageId, resource, styles, top, type });
            props.handleDropSticker(newStickerData);
        },
        // collect: monitor => ({
        //     isOver: !!monitor.isOver(),
        //     canDrop: !monitor.canDrop(),
        //     getSourceClientOffset: monitor.getSourceClientOffset,
        //     getInitialClientOffset: monitor.getInitialClientOffset,
        //     getInitialSourceClientOffset: monitor.getInitialSourceClientOffset,
        //     getClientOffset: monitor.getClientOffset,
        // }) /* todo: check is Really Required? or can we write drop calculation here */
    });

    return (
        <div className="page--wrapper" style={{ width, height,}}>
            {/* <PageInfo pageInfo={`Page ${pageNo}`} /> */}
            <Placeholder className={isBackgroundLoaded ? 'comp--hide' : 'comp--visible'}     style={{ height: "300px", width: "100%", visibility: isBackgroundLoaded ? 'hidden' : 'visible' }}>
                <Placeholder.Image />
            </Placeholder>
            <div class="page--container" style={ {transform: `scale(${scale})`, width: '681px', height: '400px', transformOrigin: '0 0', marginTop: '20px'}}>
            <div className={`page ${pageId} ${isBackgroundLoaded ? 'comp--visble' : 'comp--hide'}`} ref={drop} style={ {transform: `scale(${1})`, width: '681px', height: '400px', transformOrigin: '0 0'}}>
                <IF condition={showBackgroundImage}>
                    <img alt="img" src={backgroundImage} draggable="false" width="100%" ref={pageRef} onLoad={() => setIsBackgroundLoaded(true)}/>
                </IF>
                <IF condition={showBorderGuide && activeStickerId }>
                    <BorderGuide drawPoints={drawPoints} pageId={pageId} scale={scale}/>
                </IF>
                <Stickers {...props} />
            </div>
            </div>
        </div>
    );
};
