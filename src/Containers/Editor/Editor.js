import React, { PureComponent } from 'react';

import { Pages } from 'Containers';

import { pages } from 'Containers/Pages/data'

import './Editor.scss'

export class Editor extends PureComponent {
    render() {
        return <div className="pagesContainer">
            <Pages pages={pages}/>
        </div>
    }
}
