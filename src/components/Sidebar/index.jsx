import React, { Component } from 'react'
import ImageToolbar from '../ImageToolbar'
import TextToolbar from '../TextToolbar'
import { textStickerData } from './data'
import * as imageStickersData from 'components/ImageToolbar/images/svg/index.js'
import './Style.css'

class SideBar extends Component {
  state = { showSidebar: false }

  render() {
    const toggleSidebar = () => {
      this.setState(prevState => ({ showSidebar: !prevState.showSidebar }))
    }
    const textStickers = textStickerData.map((sticker, index) => (
      <TextToolbar data={sticker} key={index} onClick={toggleSidebar} />
    ))
    const imageStickers = Object.keys(imageStickersData).map((key, index) => {
      const data = {
        id: index,
        src: imageStickersData[key],
        style: {
          width: '100px',
          height: 'auto',
        },
        type: 'image',
      }
      return <ImageToolbar data={data} key={index} />
    })

    return (
      <React.Fragment>
        <div
          className={`sidebar--toggle ${this.state.showSidebar ? 'active' : ''}`}
          onClick={() => toggleSidebar()}
        >
          <i className="fa fa-chevron-right" />
        </div>
        <div className={`col-3 sidebar ${this.state.showSidebar ? 'active' : ''}`}>
          {textStickers}
          <div className="sidebar_image_container"> {imageStickers} </div>
        </div>
      </React.Fragment>
    )
  }
}
export default SideBar
