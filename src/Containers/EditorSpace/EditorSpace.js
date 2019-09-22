import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Editor } from 'Containers';
import { Sidebar } from 'Components';
import { ADD_STICKER, MOVE_STICKER } from 'store/actions';
import './Style.scss';

const EditorSpace = () => {
    const editorReducer = useSelector(({ editorReducer }) => editorReducer);
    const dispatch = useDispatch();
    const { pages } = editorReducer;

    const updateSticker = payload => dispatch({ type: MOVE_STICKER, payload });
    const handleDropSticker = payload => dispatch({ type: ADD_STICKER, payload });

    return (
        <div className="mainContainer height-100">
            <Sidebar />
            <div className="editorContainer">
                <div>Tool bar<br /><br /><br /></div>
                <Editor pages={pages} updateSticker={updateSticker} handleDropSticker={handleDropSticker} />
            </div>
        </div>
    );
}

export default EditorSpace;
