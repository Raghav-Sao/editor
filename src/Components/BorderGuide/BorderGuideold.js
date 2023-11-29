import React, { Fragment, PureComponent } from 'react';

export class BorderGuide extends PureComponent {
    constructor(props) {
        super(props);
        this.cardRef = React.createRef();
    }

    render() {
        const { alignLeft, alignTop, pageWidth } = this.props;
        return (
            <Fragment>
                <div
                    className="left--guide"
                    style={{
                        left: alignLeft,
                    }}
                />

                <div
                    className="top--guide"
                    style={{
                        top: alignTop,
                    }}
                />

                <div
                    className="horozontalCenter--guide"
                    style={{
                        left: pageWidth / 2,
                    }}
                />

                <div
                    className="vericalCenter--guide"
                    style={{
                        left: pageWidth / 2,
                    }}
                />
            </Fragment>
        );
    }
}
