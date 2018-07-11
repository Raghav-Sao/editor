import React, { Component } from 'react'
import ImageToolbar from '../ImageToolbar'
import TextToolbar from '../TextToolbar'
import { textStickerData } from './data'
import { imageStickerData } from '../ImageToolbar/data'

import './Style.css'

class SideBar extends Component {

  render() {
    const textStickers = textStickerData.map((sticker, index) => (
      <TextToolbar data={sticker} key={index}  />
    ))
    const imageStickers = imageStickerData.map((sticker, index) => (
      <ImageToolbar data={sticker} key={index} />
    ))
    return (
      <div className="col-3 sidebar">
        {textStickers}
        {imageStickers}
      </div>
    )
  }
}
export default SideBar
