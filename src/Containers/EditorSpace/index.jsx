import React, { Component, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
 import { Grid } from 'semantic-ui-react';
 import { Editor }  from 'Containers';
import { Sidebar } from 'Components';
// import CardPageEditor from './CardPageEditor';
import { MOVE_STICKER } from 'store/actions';
import './Style.scss';

const EditorSpace = () => {
    const editorReducer = useSelector( ({ editorReducer }) => editorReducer);
    const { pages } = editorReducer;
    const dispatch = useDispatch();
    const updateSticker = data => {
        console.log(data);
        dispatch({ type: MOVE_STICKER, payload: data})
    }
    return (
        <Fragment>
            <div className="mainContainer height-100">
                <Sidebar />
                {/* <div width={12} className="height-100"> */}
                    {/* <CardPageEditor cardId={1234} /> */}
                    <div className="editorContainer">
                        <div>Tool bar<br /><br /><br /></div>
                        <Editor pages={pages} updateSticker={updateSticker} />
                    </div>
                {/* </div> */}
            </div>
        </Fragment>
    );
}

export default EditorSpace;
