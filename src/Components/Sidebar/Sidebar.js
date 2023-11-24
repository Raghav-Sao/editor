import React, { useState } from 'react';
import { IMAGE } from 'constant';

import Toolbar from 'Components/Toolbar';
import './Sidebar.scss';

export const Sidebar = () => {
    const [activeType, updateActiveType] = useState(IMAGE);
    const menu = ['TEXT', 'IMAGE'];

    const handleMenuOptionChanges = activeType => () => updateActiveType(activeType);

    return (
        <div className="sidebar">
            {/* <div className="menu--toggler" onClick={this.showDetails}>-></div> */}
            <div className="menu">
                {menu.map(option => (
                    <div
                        className={`menu--option ${option === activeType ? 'active' : ''}`}
                        onClick={handleMenuOptionChanges(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
            <div className="menuDetails">
                {/* <Divider horizontal inverted> */}
                <div className="header--divider">{activeType}</div>
                {/* </Divider> */}
                <Toolbar type={activeType} />
            </div>
        </div>
    );
};
