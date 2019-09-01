import React from 'react';

export const IF = props => {
    const { children, condition = false } = props;
    { return condition ? children : null }
}