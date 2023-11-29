import React from 'react';
import './BorderGuide.scss';

export const BorderGuide = (props) => {
    const {drawPoints = [] } = props;
    return (
        <>
            {drawPoints.map((style) => {
                const left = (style.x1)+'px';
                const top = (style.y1)+'px';
                const width = style.x1 === style.x2 ? '1px' : (style.x2 - style.x1)+'px';
                const height = style.y1 === style.y2 ?   '1px' : (style.y2 - style.y1)+'px';
                return  <div
                    className="border--guide "
                    style={{
                        left, width, height, top 
                    }}
                />
            })}
        </>
    )
}
