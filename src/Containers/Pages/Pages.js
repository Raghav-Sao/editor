import React, { PureComponent } from 'react';

import { Page } from 'Components';

import './Pages.scss';

export class Pages extends PureComponent {
    render() {
        const { pages = {} } = this.props;
        return (
            <div className="pages">
                { Object.keys(pages).map((key, index) => <Page key={key} page={pages[key]} pageNo={index+1} /> )}
            </div>
        )
    }
}
