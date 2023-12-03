import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from 'Containers';
import { Sidebar, EditorToolbar } from 'Components';
import { calculateStyleChanges, calculateNewStickerData } from 'Containers/Editor/editorUtils';
import { ADD_STICKER, DELETE_STICKER, MOVE_STICKER, RESET_ACTIVE_STICKER,  UPDATE_STICKER, UPDATE_ACTIVE_STICKER, UPDATE_STICKER_TEXT } from 'store/actions';
import './Style.scss';

const EditorSpace = () => {
    const [scale, setScale] = useState(Math.min(window.innerWidth < 1024 ? window.innerWidth/1200 : 1),1);
    const handleResize = () => {
        const _scale = Math.min(window.innerWidth/1200, 1);
        setScale(_scale);
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, window.innerWidth)
    const preventDefault = e => {
        e.preventDefault();
    }
    useEffect(() => {
        window.addEventListener('contextmenu', preventDefault);
        return () => {
            window.removeEventListener('contextmenu', preventDefault)
        }
    }, [])

    const editorReducer = useSelector(({ editorReducer }) => editorReducer);
    const dispatch = useDispatch();
    const { pages, activePageId, activeSticker, activeSticker: {id: activeStickerId} = {} } = editorReducer;
    const updateSticker = payload => dispatch({ type: MOVE_STICKER, payload });
    const updateActiveStickerId = payload => dispatch({ type: UPDATE_ACTIVE_STICKER, payload });
    const handleDropSticker = payload => dispatch({ type: ADD_STICKER, payload });
    const handleToolbarActivity = activityInfo => {
        const {action, activePageId: pageId, activeSticker: {id: stickerId} = {}} = activityInfo; 
        if(action === 'DELETE') { /* check above  activeSticker will be same ?? */
            dispatch({ type: DELETE_STICKER, payload:{ pageId, stickerId } });
            return;
        }
        const payload = calculateStyleChanges({...activityInfo, pages});
        dispatch({ type: UPDATE_STICKER, payload });
    }
    const resetActiveSticker = () => {
        dispatch({ type: RESET_ACTIVE_STICKER })
    }

    const handleTextChanges = ({activePageId, text, activeStickerId}) => {
        dispatch({ type: UPDATE_STICKER_TEXT, payload: {pageId: activePageId, stickerId: activeStickerId, text} });
    }

    const handleAddSticker = ({resource, styles, type}) => {
        const left = Math.round(Math.random() * 200);
        const top = Math.round(Math.random() * 300);
        const newStickerData = calculateNewStickerData({ left, pageId: activePageId, resource, styles, top, type });
        handleDropSticker(newStickerData);
    }

    return (
        <div className="mainContainer height-100">
            <Sidebar handleAddSticker={handleAddSticker}/>
            <div className="editorContainer">
                <EditorToolbar activePageId={activePageId} pages={pages} activeSticker={activeSticker} handleToolbarActivity={handleToolbarActivity} hideActiveSticker={resetActiveSticker}/>
                <Editor scale={scale} activePageId={activePageId} activeStickerId={activeStickerId} pages={pages} updateSticker={updateSticker} updateActiveStickerId={updateActiveStickerId} handleDropSticker={handleDropSticker} handleTextChanges={handleTextChanges}/>
            </div>
        </div>
    );
};

export default EditorSpace;
