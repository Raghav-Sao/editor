import React, {PureComponent} from 'react';

import { Sticker } from 'Components';

export class Stickers extends PureComponent {
    render() {
        const { page: { stickers = {} } = {} } = this.props;

        return (
            <div>
                {Object.keys(stickers).map(key => <Sticker sticker={stickers[key]} />)}
            </div>
        )
    }
}