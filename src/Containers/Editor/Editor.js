import React from 'react';

import { Pages } from 'Containers';
import './Editor.scss';

export const Editor = props => {
    return (
        <div className="pagesContainer">
            <Pages {...props} />
        </div>
    );
};
