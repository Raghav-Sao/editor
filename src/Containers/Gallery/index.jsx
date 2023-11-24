import React, { Component, Fragment } from 'react'
import Filter from './SidebarFilter'
import GalleryContent from './GalleryContent'
import Style from './Style.scss'

class Gallery extends Component {
  render() {
    return (
      <Fragment>
        <Filter />
        <GalleryContent />
      </Fragment>
    )
  }
}

export default Gallery
