import React, { Component } from 'react'
import { actionCreator } from 'store/actionCreator'
import { connect } from 'react-redux'
import { getCompressUrl } from 'lib/utils'

import ImagePreview from 'components/Admin/ImagePreview'

import './Style.css'

class CardCreation extends Component {
  // fileReader = new FileReader()
  componentDidMount() {
    // this.fileReader.addEventListener('load', this.imageLoaded)
  }
  componentWillUnmount() {
    // this.fileReader.removeEventListener('load', this.imageLoaded)
  }

  uploadImage = (event, imageUrl = null) => {
    const files = imageUrl ? imageUrl : event.target.files
    for (var i = 0; i < files.length; i++) {
      if (files[i]) {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', event => {
          const dataURI = fileReader.result
          this.props.dispatch(
            actionCreator.UPLOAD_IMAGE({
              dataURI: [dataURI],
            })
          )
        })
        fileReader.readAsDataURL(files[i])
      }
    }
  }

  updateImagePreview(isLeft) {
    debugger
    const { props: { images: { length }, previewIndex: index } } = this
    const previewIndex = isLeft
      ? index === 0 ? index : index - 1
      : index === length - 1 ? index : index + 1
    this.updateImageIndex(previewIndex)
  }

  updateImageIndex(previewIndex) {
    debugger
    this.props.dispatch(actionCreator.UPDATE_PREVIEW_INDEX({ previewIndex }))
  }

  render() {
    const { images, images: { length }, previewIndex } = this.props
    return (
      <div className="flex__row admin__card__creation">
        <div className="flex__row--column upload__images__container">
          {length > 0 && (
            <ImagePreview
              images={images}
              updateImagePreview={isLeft => this.updateImagePreview(isLeft)}
            />
          )}
          <div className="flex__container attchment__details__container">
            <div className="flex__container input__attachment_details">
              {length > 0 && <span>{getCompressUrl({ url: images[previewIndex] })}</span>}
              <input
                accept="image/*"
                className="hide"
                id="upload__images"
                onChange={this.uploadImage}
                type="file"
                multiple
              />
              <label htmlFor="upload__images" className="icon-attach" />
            </div>
          </div>
          {length > 0 && (
            <div className="flex__container--column preview__url__container">
              {images.map((url, index) => (
                <span
                  className={`${previewIndex === index ? 'active' : ''} image__url pointer`}
                  onClick={() => this.updateImageIndex(index)}
                >
                  {getCompressUrl({ url })}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex__row--column card__details__from">
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <input type="text" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ adminReducer: { images, previewIndex } }) => ({ images, previewIndex })
export default connect(mapStateToProps)(CardCreation)
