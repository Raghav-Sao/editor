import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actionCreator } from '../../store/actionCreator'
import Style from './Style.css'

class TextEditorTool extends Component {
  fileReader = new FileReader()
  componentDidMount() {
    this.fileReader.addEventListener('load', this.imageLoaded)
  }

  componentWillUnmount() {
    this.fileReader.removeEventListener('load', this.imageLoaded)
  }

  imageLoaded = event => {
    const dataURI = this.fileReader.result
    this.props.dispatch(
      actionCreator.CHANGE_BACKGRUOND_IMAGE({
        backgroundImage: dataURI,
      })
    )
  }

  changeBackground = event => {
    const file = event.target.files[0]
    if (file) {
      this.fileReader.readAsDataURL(file)
    }
  }

  onTextStyleChange = e => {
    this.props.dispatch(
      actionCreator.CHANGE_TEXT_STICKER_STYLE({
        style: { [e.currentTarget.name]: e.currentTarget.value },
      })
    )
  }

  deleteSticker = id => {
    this.props.dispatch(actionCreator.DELETE_STICKER({ id }))
  }

  preventPropagation = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  render() {
    const {
      activeSticker: { style: activeStyle = {}, type: activeType },
      isBackgroundImageSelected,
    } = this.props

    const showEditorTool = typeof activeType !== 'undefined' || isBackgroundImageSelected

    return (
      <div
        className={`col-9 sticker__editor__tool ${showEditorTool ? 'active' : ''}`}
        onClick={e => this.preventPropagation(e)}
      >
        {isBackgroundImageSelected && (
          <div className="sticker__editor__tool__image">
            <input id="imageUpload" accept="image/*" type="file" onChange={this.changeBackground} />
            <label htmlFor="imageUpload" className="btn">
              <i className="fa fa-camera" />
            </label>
          </div>
        )}
        {activeType === 'text' && (
          <div className={`text__editor__tool ${activeType === 'text' ? 'active' : ''}`}>
            <select name="fontSize" onChange={this.onTextStyleChange} value={activeStyle.fontSize}>
              <option>Select</option>
              {[...Array(20)].map((x, i) => {
                return <option key={i} value={`${i + 10}px`}>{`${i + 10}px`}</option>
              })}
            </select>
            <input
              id="text__bold"
              checked={activeStyle.fontSize === 'bold'}
              type="checkbox"
              name="fontWeight"
              value={activeStyle.fontWeight === 'bold' ? 'normal' : 'bold'}
              onChange={e => this.onTextStyleChange(e)}
            />
            <label htmlFor="text__bold">
              <i className="fa fa-bold" />
            </label>

            <input
              id="text__italic"
              checked={activeStyle.fontStyle === 'italic'}
              type="checkbox"
              name="fontStyle"
              value={activeStyle.fontStyle === 'italic' ? 'normal' : 'italic'}
              onChange={e => this.onTextStyleChange(e)}
            />
            <label htmlFor="text__italic">
              <i className="fa fa-italic" />
            </label>

            <input
              id="text__left"
              checked={activeStyle.textAlign === 'left'}
              type="radio"
              name="textAlign"
              value="left"
              onChange={e => this.onTextStyleChange(e)}
            />
            <label htmlFor="text__left">
              <i className="fa fa-align-left" />
            </label>

            <input
              id="text__middle"
              checked={activeStyle.textAlign === 'center'}
              type="radio"
              name="textAlign"
              value="center"
              onChange={e => this.onTextStyleChange(e)}
            />
            <label htmlFor="text__middle">
              <i className="fa fa-align-center" />
            </label>

            <input
              id="text__right"
              checked={activeStyle.textAlign === 'right'}
              type="radio"
              name="textAlign"
              value="right"
              onChange={e => this.onTextStyleChange(e)}
            />
            <label htmlFor="text__right">
              <i className="fa fa-align-right" />
            </label>
          </div>
        )}
        <div
          className={`inline common__editor__tool ${
            typeof activeType !== 'undefined' ? 'active' : ''
          }`}
        >
          <label className="btn" onClick={this.deleteSticker}>
            <i className="fa fa-trash" />
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ imageEditor: { activeSticker, isBackgroundImageSelected } }) => ({
  activeSticker,
  isBackgroundImageSelected,
})
export default connect(mapStateToProps)(TextEditorTool)
