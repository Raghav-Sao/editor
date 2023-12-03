import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import TextToolbar from './TextToolbar';
import ImageToolbar from './ImageToolbar';
import { general, language } from 'constant';

import './Style.scss';

const Toolbar = props => {
    const { type, handleDrag } = props;

    const editorSpace = useSelector(({ editorSpace }) => editorSpace);
    const { imageStickers, textStickers } = editorSpace;

    const getToolbar = type => {
        const { TEXT, IMAGE } = general[language];
        switch (type) {
            case TEXT: {
                return (
                    <div className="text__toolbar__container">
                        {textStickers.map((sticker, index) => (
                            <TextToolbar sticker={sticker} index={index} handleDrag={handleDrag} {...props} />
                        ))}
                    </div>
                );
            }

            case IMAGE: {
                return (
                    <div className="image__toolbar__container">
                        <Grid columns="two">
                            <Grid.Row>
                                {imageStickers.map((sticker, index) => (
                                    <Grid.Column>
                                        <ImageToolbar sticker={sticker} index={index} handleDrag={handleDrag} {...props} />
                                    </Grid.Column>
                                ))}
                            </Grid.Row>
                        </Grid>
                    </div>
                );
            }

            default:
                return <div />;
        }
    };
    return getToolbar(type);
};
export default Toolbar;
