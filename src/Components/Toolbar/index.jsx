import React, { Component } from 'react'

import TextToolbar from './TextToolbar'
import ImageToolbar from './ImageToolbar'
import { general, language } from 'Constants'
import './Style.css'

class Toolbar extends Component {
  getToolbar = type => {
    const { TEXT, IMAGE } = general[language]
    switch (type) {
      case TEXT:
        return <TextToolbar />
      case IMAGE:
        return <ImageToolbar />
      default:
        return <div />
    }
  }
  render() {
    const {
      props: { type },
    } = this
    return this.getToolbar(type)
  }
}

export default Toolbar
