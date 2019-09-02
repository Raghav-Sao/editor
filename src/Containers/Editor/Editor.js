import React, { PureComponent } from 'react';

import { Pages } from 'Containers';

import './Editor.scss'

export class Editor extends PureComponent {
    render() {
        return <div className="pagesContainer">
            <Pages {...this.props} />
        </div>
    }
}
