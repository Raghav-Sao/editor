import React, { Component } from 'react'
import ImageToolbar from '../ImageToolbar'
import TextToolbar from '../TextToolbar'
import { textStickerData } from './data'
import * as imageStickersData from 'components/ImageToolbar/images/svg/index.js'
import './Style.css'

class SideBar extends Component {
  render() {
    const textStickers = textStickerData.map((sticker, index) => (
      <TextToolbar data={sticker} key={index} />
    ))
    const imageStickers = Object.keys(imageStickersData).map((key, index) => {
      const data = {
        id: index,
        src: imageStickersData[key],
        style: {
          width: '100px',
          height: 'auto',
        },
        type: 'img',
      }
      return <ImageToolbar data={data} key={index} />
    })

    return (
      <div className="col-3 sidebar">
        {textStickers}
        <div className="sidebar_image_container"> {imageStickers} </div>
      </div>
    )
  }
}
export default SideBar
