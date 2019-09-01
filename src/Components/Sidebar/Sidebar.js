import React, { useState } from 'react';

import Toolbar from 'Components/Toolbar';
import { ACTIVE, TEXT, IMAGE } from 'constant';

import './Sidebar.scss';

export const Sidebar = () => {
    const [activeType, updateActiveType] = useState(IMAGE);
    const menu = ['TEXT', 'IMAGE'];

    return (
        <div className="sidebar">
            {/* <div className="menu--toggler" onClick={this.showDetails}>-></div> */}
            <div className="menu">
                {menu.map(option => 
                    <div className={`menu--option ${option === activeType ? ACTIVE : '' }`}>
                        {option}
                    </div>
                )}
            </div>
            <div className="menuDetails ">
                {/* <Divider horizontal inverted> */}
                    {activeType}
                {/* </Divider> */}
                <Toolbar type={activeType} />
            </div>
        </div>
    )
}