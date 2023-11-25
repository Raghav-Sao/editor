import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from 'Containers';
import { Sidebar, EditorToolbar } from 'Components';
import { calculateStyleChanges } from 'Containers/Editor/editorUtils';
import { ADD_STICKER, DELETE_STICKER, MOVE_STICKER, RESET_ACTIVE_STICKER,  UPDATE_STICKER, UPDATE_ACTIVE_STICKER } from 'store/actions';
import './Style.scss';

const EditorSpace = () => {
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

    return (
        <div className="mainContainer height-100">
            <Sidebar />
            <div className="editorContainer">
                <EditorToolbar activePageId={activePageId} pages={pages} activeSticker={activeSticker} handleToolbarActivity={handleToolbarActivity} hideActiveSticker={resetActiveSticker}/>
                <Editor activePageId={activePageId} activeStickerId={activeStickerId} pages={pages} updateSticker={updateSticker} updateActiveStickerId={updateActiveStickerId} handleDropSticker={handleDropSticker} />
            </div>
        </div>
    );
};

export default EditorSpace;
