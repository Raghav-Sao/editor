import React, { Component, Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import { Sidebar } from 'Components';
import CardPageEditor from './CardPageEditor';
import './Style.scss';
import { Editor }  from 'Containers';

class EditorSpace extends Component {
    render() {
        return (
            <Fragment>
                <div className="mainContainer height-100">
                    <Sidebar />
                    {/* <div width={12} className="height-100"> */}
                        {/* <CardPageEditor cardId={1234} /> */}
                        <div className="editorContainer">
                            <div>Tool bar<br /><br /><br /></div>
                            <Editor />
                        </div>
                    {/* </div> */}
                </div>
            </Fragment>
        );
    }
}

export default EditorSpace;
