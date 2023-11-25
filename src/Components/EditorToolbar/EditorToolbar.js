import React, { useState } from 'react';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
import { Button, Divider, Dropdown, Grid, Icon, Label, Popup } from 'semantic-ui-react'
import { SketchPicker } from 'react-color'
import './EditorToolbar.scss';
import { TEXT_STICKER } from 'constant';
export const EditorToolbar = (props) => {    
    const {activePageId = '', activeSticker, activeSticker: { type: activeType, styles: activeStickerStyles = {}} = {}} = props;
    const [showTextAlignFilter, setShowTextAlignFilter] = useState(false);
    const [documentColors, setDocumentColors] = useState([]);
    const deleteSticker = () => {
        props.handleToolbarActivity({action: 'DELETE', activePageId, activeSticker });
      }
    
    const setDocumentColorPallete = () => {
        const colors = [];
        if (activePageId )
            try {
                /* todo: check for ref instead of dom */
                document
                .getElementsByClassName(`page content--row ${activePageId}`)
                [0].childNodes.forEach(
                    ({ style: { color, fill } }) =>
                    color || fill ? colors.push(color) : console.log(color || fill)
                )
            } catch(error) {
                console.error("error while getting doc color for pageId:", activePageId);
            }
            if(colors.length> 0) {
                setDocumentColors([...new Set(colors)]);
        }
    }
    
    const getFontSizeOptions = () => 
        [...Array(30)].map((x, i) => (
            <Dropdown.Item
            key={i}
            value={i + 10}
            selected={
                activeSticker.styles && i + 10 === activeSticker.styles.fontSize
            }
            name="fontSize"
            onClick={onTextFontSizeChange}
            >{`${i + 10}px`}</Dropdown.Item>
    ));
    
    const handleColorChanges = color => {
        const styles = {
            color: color.hex,
        }
        props.handleToolbarActivity({action: 'TEXT_STYLE_CHANGE', activePageId, activeSticker, styles});
        setTimeout(setDocumentColorPallete)
    }
    
    const onTextStyleChange = e => {
        const styles = { [e.currentTarget.name]: e.currentTarget.value };
        props.handleToolbarActivity({action: 'TEXT_STYLE_CHANGE', activePageId, activeSticker, styles})
    }
    
    const onTextFontSizeChange = (e, data) => {
        const styles = { fontSize: data.value };
        props.handleToolbarActivity({action: 'TEXT_STYLE_CHANGE', activePageId, activeSticker, styles})
    }
    
    const toggleTextAlignFilter = () => {
    setShowTextAlignFilter(!showTextAlignFilter);
    }
    
    const preventPropagation = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation()
    }
    
    const hadleDownload = () => {
        props.hideActiveSticker();
        setTimeout(handleCaptureClick, 1000);
    }
    const handleCaptureClick = async () => {
        const canvas = await html2canvas(document.querySelector(`.page.content--row.${activePageId}`));
        const dataURL = canvas.toDataURL('image/png');
        downloadjs(dataURL, 'download.png', 'image/png');
        
    };
    const saveChanges = () => {
    // this.props.onToolbarActivity('SAVE', this.props.activeSticker);
    }
    return (
        <>
            <div
                className={`editor__text__toolbar__container ${activeType ? 'active': ''}`}
                onClick={e => {
                    preventPropagation(e)
                    console.log('click')
                }}
            >
                <Button onClick={hadleDownload}>Download</Button>
                <>
                    <Popup
                        trigger={
                            <label className="ui button icon active" style={{ color: activeStickerStyles.color }}>
                                <Icon name="paint brush" />
                            </label>
                        }
                        position="bottom center"
                        on={['hover', 'click']}
                        onOpen={setDocumentColorPallete}
                        hoverable
                    >
                        <div className="color_palletee__container">
                            <Divider horizontal>Document Color</Divider>
                            <div className="document_color__container">
                                {documentColors.map(color => (
                                    <>
                                    <span
                                        style={{
                                            backgroundColor: color,
                                            width: '25px',
                                            height: '25px',
                                            display: 'inline-block',
                                        }}
                                        onClick={() => handleColorChanges({ hex: color })}
                                        key={color}
                                    />
                                </>
                                ))}
                            </div>
                            <Divider horizontal>Default Color</Divider>

                            <SketchPicker
                                color={activeStickerStyles.color}
                                onChangeComplete={handleColorChanges}
                            />
                        </div>
                    </Popup>
                </>
                {activeType === TEXT_STICKER && (
                    <>
                        <>
                            <input
                                id="text__bold"
                                checked={activeStickerStyles.fontWeight === 'normal'}
                                className="display--none"
                                type="checkbox"
                                name="fontWeight"
                                value={activeStickerStyles.fontWeight === 'bold' ? 'normal' : 'bold'}
                                onChange={e => onTextStyleChange(e)}
                            />
                            <label htmlFor="text__bold" className={`ui button icon ${activeStickerStyles.fontWeight === 'bold' ? 'active': ''}`}>
                                <Icon name="bold" />
                            </label>
                        </>
                        <>
                            <input
                                id="text__italic"
                                checked={activeStickerStyles.fontStyle === 'italic'}
                                className="display--none"
                                type="checkbox"
                                name="fontStyle"
                                value={activeStickerStyles.fontStyle === 'italic' ? 'normal' : 'italic'}
                                onChange={e => onTextStyleChange(e)}
                            />
                            <label htmlFor="text__italic" className={`ui button icon ${activeStickerStyles.fontStyle === 'italic' ? 'active': ''}`}>
                                <Icon name="italic" />
                            </label>
                        </>
                        <>
                            <Popup
                                className="text__align__container"
                                trigger={
                                    <label htmlFor="text__align__container" className="ui button icon active">
                                        <Icon name={`align ${activeStickerStyles.textAlign}`} />
                                    </label>
                                }
                                position="bottom center"
                                on={['hover', 'click']}
                                flowing
                                hoverable
                            >
                                <input
                                    id="text__left"
                                    checked={activeStickerStyles.textAlign === 'left'}
                                    className="display--none"
                                    type="radio"
                                    name="textAlign"
                                    value="left"
                                    onChange={e => {
                                        onTextStyleChange(e);
                                        toggleTextAlignFilter();
                                    }}
                                />
                                <label className="ui button icon" htmlFor="text__left">
                                    <Icon name="align left" />
                                </label>
                                <input
                                    id="text__middle"
                                    checked={activeStickerStyles.textAlign === 'center'}
                                    className="display--none"
                                    type="radio"
                                    name="textAlign"
                                    value="center"
                                    onChange={e => {
                                        onTextStyleChange(e); toggleTextAlignFilter()
                                    }}
                                />
                                <label className="ui button icon" htmlFor="text__middle">
                                    <Icon name="align center" />
                                </label>

                                <input
                                    id="text__right"
                                    checked={activeStickerStyles.textAlign === 'right'}
                                    className="display--none"
                                    type="radio"
                                    name="textAlign"
                                    value="right"
                                    onChange={e => {
                                        onTextStyleChange(e); toggleTextAlignFilter()
                                    }}
                                />
                                <label className="ui button icon" htmlFor="text__right">
                                    <Icon name="align right" />
                                </label>
                            </Popup>
                        </>
                        <>
                            <Dropdown
                                options={getFontSizeOptions()}
                                selection
                                text={`${activeStickerStyles.fontSize}`}
                                style={{ margin: '0 .25em 0 0' }}
                                onClick={preventPropagation}
                            />
                        </>
                    </>
                )}

                <>
                    <label className="ui button icon" onClick={deleteSticker}>
                        <Icon name="trash alternate" />
                    </label>
                </>
            </div>
        </>
    )
}
