import React, { useState } from 'react';
import { IMAGE } from 'constant';

import Toolbar from 'Components/Toolbar';
import './Sidebar.scss';

export const Sidebar = (props) => {
    const [activeType, updateActiveType] = useState(IMAGE);
    const [showDetails, setShowDetails] = useState(false);
    const menu = ['TEXT', 'IMAGE'];

    const handleMenuOptionChanges = _activeType => () => {
        updateActiveType(_activeType);
        setShowDetails(!showDetails || _activeType !== activeType);
        /* prevent setShowDetails trigger for desktop */
    };

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
            <div className={`menuDetails ${showDetails ? 'active' : ''}`}>
                {/* <Divider horizontal inverted> */}
                <div className="header--divider">{activeType}</div>
                {/* </Divider> */}
                <Toolbar type={activeType} setShowDetails={setShowDetails} {...props}/>
            </div>
        </div>
    );
};
