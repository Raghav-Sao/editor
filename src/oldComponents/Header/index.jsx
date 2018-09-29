import React, { Component } from 'react'
import { actionCreator } from '../../store/actionCreator'
import { connect } from 'react-redux'

import './style.css'

class Header extends Component {
  onDownloadImage = () => {
    const canvas = document.createElement('canvas')
    const htmlElement = document.querySelector('#background__image__container')
    const { offsetHeight: height, offsetWidth: width } = htmlElement.querySelector('#card__image')
    canvas.height = height
    canvas.width = width
    const ctx = canvas.getContext('2d')
    const html = new XMLSerializer().serializeToString(htmlElement)
    const data = `<svg height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg" >' +
      '<foreignObject height="100%" width="100%" >
      ${html}
      </foreignObject>
      </svg>`
    const image = new Image()
    image.onload = () => {
      ctx.drawImage(image, 0, 0)
      const outputDataURI = canvas.toDataURL()
      var link = document.createElement('a')
      link.download = 'name.png'
      link.href = outputDataURI
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    image.src = 'data:image/svg+xml; charset=utf8, ' + data
  }
  render() {
    return (
      <div className="col-12 header">
        <span>E-Cards</span>
        <div className="relative inline-block download--workspace">
          <button onClick={this.onDownloadImage}>Download</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ imageEditor: { activeSticker, isBackgroundImageSelected } }) => ({})
export default connect(mapStateToProps)(Header)
