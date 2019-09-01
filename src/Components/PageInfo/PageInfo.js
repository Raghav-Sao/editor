import React from 'react';
import './PageInfo.scss';

export const PageInfo = ({pageInfo = ''} = {}) =>
    <div className="page--info content--row">{pageInfo}</div>
