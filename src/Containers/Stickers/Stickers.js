import React, { Fragment} from 'react';

import { Sticker } from 'Components';

export const Stickers = props => {
    const { page: { stickers = {} } = {} } = props;

    return (
        <Fragment>
            {Object.keys(stickers).map(key => <Sticker key={key} sticker={stickers[key]} {...props} />)}
        </Fragment>
    )
}
