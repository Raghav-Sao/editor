import React, { Component } from 'react'
import { actionCreator } from 'store/actionCreator'
import { connect } from 'react-redux'
import './Style.css'

class ImagePreview extends Component {
  render() {
    const { props: { images, images: { length }, previewIndex, updateImagePreview } } = this
    return (
      <div className="flex__container--column image__preview__wrapper">
        <div className="flex__container--center image__preview__container">
          {length > 0 && <img src={images[previewIndex]} alt="img" />}
          {previewIndex > 0 && (
            <span
              className="flex__container--center image__preview_slider icon-left-open-big"
              onClick={() => updateImagePreview(true)}
            />
          )}
          {previewIndex < length - 1 && (
            <span
              className="flex__container--center image__preview_slider icon-right-open-big link"
              onClick={() => updateImagePreview(false)}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ adminReducer: { previewIndex } }) => ({ previewIndex })

export default connect(mapStateToProps)(ImagePreview)
