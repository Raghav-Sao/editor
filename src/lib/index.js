const style = [
    {
        type: 'px',
        value: ['blur', 'translate', 'translateX', 'translateY', 'translateZ', 'skew', 'skewX', 'skewY'],
    },
    {
        type: '%',
        value: ['brightness', 'contrast', 'grayscale', 'sepia'],
    },
    {
        type: null,
        value: ['opacity', 'saturate', 'scale', 'scaleX', 'scaleY'],
    },
    {
        type: 'px',
        value: 'translateX',
    },
    {
        type: 'px',
        value: 'translateX',
    },
];

export const getTramsfromStyle = num => {
    if (!num) return {};
    const key = Object.keys(num);
    const transfromObj = {};
    let result = '';
    key.forEach(i => {
        transfromObj[i] = true;
        switch (i) {
            case 'rotate': {
                result = result.concat(`rotate(${num[i]}deg) `);
                break;
            }
            case 'brightness': {
                result = result.concat(`brightness(${num[i]}%) `);
                break;
            }
            case 'contrast': {
                result = result.concat(`contrast(${num[i]}%) `);
                break;
            }
            case 'grayscale': {
                result = result.concat(`grayscale(${num[i]}%) `);
                break;
            }
            case 'invert': {
                result = result.concat(`invert(${num[i]}%) `);
                break;
            }
            case 'sepia': {
                result = result.concat(`sepia(${num[i]}%) `);
                break;
            }

            case 'translate': {
                result = result.concat(`translate(${num[i]}px) `);
                break;
            }
            case 'translateX': {
                result = result.concat(`translateX(${num[i]}px) `);
                break;
            }
            case 'translateY': {
                result = result.concat(`translateY(${num[i]}px) `);
                break;
            }
            case 'translateZ': {
                result = result.concat(`translateZ(${num[i]}px) `);
                break;
            }
            case 'skew': {
                result = result.concat(`skew(${num[i]}px) `);
                break;
            }
            case 'skewX': {
                result = result.concat(`skewX(${num[i]}px) `);
                break;
            }
            case 'skewY': {
                result = result.concat(`skewY(${num[i]}px) `);
                break;
            }

            case 'blur': {
                result = result.concat(`blur(${num[i]}px) `);
                break;
            }
            case 'opacity': {
                result = result.concat(`opacity(${num[i]}) `);
                break;
            }
            case 'saturate': {
                result = result.concat(`saturate(${num[i]}) `);
                break;
            }
            case 'scale': {
                result = result.concat(`scale(${num[i]}) `);
                break;
            }
            case 'scaleX': {
                result = result.concat(`scaleX(${num[i]}) `);
                break;
            }
            case 'scaleY': {
                result = result.concat(`scaleY(${num[i]}) `);
                break;
            }
        }
    });
    return { result, transfromObj };
};
