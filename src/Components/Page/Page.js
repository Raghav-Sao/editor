import React, { PureComponent } from 'react';

import { BorderGuide, IF, PageInfo } from 'Components';
import { Stickers } from 'Containers';

import { IMAGE } from 'constant';

import './Page.scss';

export class Page extends PureComponent {
    constructor(props) {
        super(props);
        this.pageRef = React.createRef();
    }

    render() {
        const { page = {}, showBorderGuide = false, pageNo } = this.props;
        
        const { pageWidth, background, name } = page;

        const { backgroundType, backgroundImage } = background;

        const showBackgroundImage = backgroundType === IMAGE;

        return (
            <div className="page--wrapper">
                <PageInfo pageInfo={`Page ${pageNo}`} />
                <div className="page content--row ">
                    <IF condition={showBackgroundImage}>
                        <img alt="img" src={backgroundImage} draggable="false" width="100%" ref={this.pageRef} />
                    </IF>
                    <IF condition={showBorderGuide}>
                        <BorderGuide pageWidth={pageWidth}/>
                    </IF>
                    <Stickers {...this.props} />
                </div>
            </div>
        )
    }
}
