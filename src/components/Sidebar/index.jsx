import React, { Component } from 'react';
import connect from 'react-redux';

import ImageToolbar from '../ImageToolbar';
import TextToolbar from '../TextToolbar';
import { textStickerData } from './data';
import { imageStickerData } from '../ImageToolbar/data';

import './Style.css';

class SideBar extends Component {
  onTextToolbarClick(e) {
    console.log(e.currentTarget);
  }
  render() {
    const textStickers = textStickerData.map(sticker => (
      <TextToolbar data={sticker} onClick={e => this.onTextToolbarClick(e)} />
    ));
    const imageStickers = imageStickerData.map(sticker => (
      <ImageToolbar data={sticker} onClick={e => this.onTextToolbarClick(e)} />
    ));
    return (
      <div className="col-3 sidebar">
        {textStickers}
        {imageStickers}
      </div>
    );
  }
}

export default SideBar;
