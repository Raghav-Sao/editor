import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTramsfromStyle } from 'lib'

import { actionCreator } from '../../store/actionCreator'
import Style from './Style.css'

class TextEditorTool extends Component {
  state = {
    blur: 0,
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
  }
  fileReader = new FileReader()
  componentDidMount() {
    this.fileReader.addEventListener('load', this.imageLoaded)
    document.addEventListener('click', () => this.setState({ showFilter: false }))
  }

  componentWillUnmount() {
    this.fileReader.removeEventListener('load', this.imageLoaded)
  }

  onFilterChange = e => {
    this.setState(
      {
        [e.currentTarget.name]: e.currentTarget.value,
      },
      () => {
        const { result } = getTramsfromStyle(this.state)
        const backgroundImageStyle = { filter: result }

        this.props.dispatch(actionCreator.CHANGE_BACKGRUOND_IMAGE_STYLE({ backgroundImageStyle }))
      }
    )
  }
  onDownloadImage = () => {
    const canvas = document.createElement('canvas')
    const htmlElement = document.querySelector('#background__image__container')
    const {offsetHeight: height, offsetWidth: width }  = htmlElement.querySelector('#card__image')
    canvas.height = height
    canvas.width = width
    const ctx = canvas.getContext('2d')
    const html = new XMLSerializer().serializeToString(htmlElement)
    const data =
      `<svg height="${height}" width="${width}" xmlns="http://www.w3.org/2000/svg" >' +
      '<foreignObject height="100%" width="100%" >
      ${html}
      </foreignObject>
      </svg>`
    const image = new Image()
    image.onload = () => {
      ctx.drawImage(image, 0, 0)
      const outputDataURI = canvas.toDataURL()
      var link = document.createElement('a')
      link.download = "name.png"
      link.href = outputDataURI
      document.body.appendChild(link);
      link.click()
      document.body.removeChild(link);
    }
    image.src = 'data:image/svg+xml; charset=utf8, ' + data
  }

  imageLoaded = event => {
    const dataURI = this.fileReader.result
    this.props.dispatch(
      actionCreator.CHANGE_BACKGRUOND_IMAGE({
        backgroundImage: dataURI,
      })
    )
  }

  changeBackground = (event, imageUrl = null) => {
    const file = imageUrl ? imageUrl : event.target.files[0]
    console.log(file)
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
        className={`col-9 sticker__editor__tool active`}
        onClick={e => this.preventPropagation(e)}
      >
        <div className="sticker__editor__tool__image">
          <div className="relative inline-block" title="Change Backgroud-image">
            <input
              id="imageUpload"
              accept="image/*"
              className="hidden"
              type="file"
              onChange={this.changeBackground}
            />
            <label htmlFor="imageUpload" className="btn">
              <i className="fa fa-camera" />
            </label>
          </div>
          <div className="relative inline-block" title="Image-Filter">
            <label className="btn relative" onClick={() => this.setState({ showFilter: true })}>
              <i className="fa fa-filter" aria-hidden="true" />
            </label>
            {this.state.showFilter && (
              <div className="filter__container">
                <div className="filter__wrapper">
                  <label>blur </label>
                  <input
                    id="filter__blur"
                    type="range"
                    min="0"
                    max="25"
                    defaultValue="0"
                    step="1"
                    value={this.state.blur}
                    name="blur"
                    onChange={e => this.onFilterChange(e)}
                  />
                  <label>{this.state.blur}</label>
                  <input
                    id="resetBlur"
                    type="button"
                    name="blur"
                    value="0"
                    className="hidden"
                    onClick={e => this.onFilterChange(e)}
                  />
                  <label className="reset__filter" title="reset ?" htmlFor="resetBlur">
                    <i className="fa fa-undo" />
                  </label>
                </div>
                <div className="filter__wrapper">
                  <label>brightness </label>
                  <input
                    id="filter__brightness"
                    type="range"
                    min="0"
                    max="200"
                    name="brightness"
                    defaultValue="100"
                    value={this.state.brightness}
                    step="1"
                    onChange={e => this.onFilterChange(e)}
                  />
                  <label>{this.state.brightness}%</label>
                  <input
                    id="reset__brightness"
                    type="button"
                    name="brightness"
                    value="100"
                    className="hidden"
                    onClick={e => this.onFilterChange(e)}
                  />
                  <label className="reset__filter" title="reset ?" htmlFor="reset__brightness">
                    <i className="fa fa-undo" />
                  </label>
                </div>
                <div className="filter__wrapper">
                  <label>contrast </label>
                  <input
                    id="filter__contrast"
                    type="range"
                    min="0"
                    max="200"
                    name="contrast"
                    defaultValue="100"
                    value={this.state.contrast}
                    step="1"
                    onChange={e => this.onFilterChange(e)}
                  />
                  <label>{this.state.contrast}%</label>
                  <input
                    id="reset__contrast"
                    type="button"
                    name="contrast"
                    value="100"
                    className="hidden"
                    onClick={e => this.onFilterChange(e)}
                  />
                  <label className="reset__filter" title="reset ?" htmlFor="reset__contrast">
                    <i className="fa fa-undo" />
                  </label>
                </div>
                <div className="filter__wrapper">
                  <label>grayscale </label>
                  <input
                    id="filter__grayscale"
                    type="range"
                    min="0"
                    max="100"
                    name="grayscale"
                    defaultValue="0"
                    value={this.state.grayscale}
                    step="1"
                    onChange={e => this.onFilterChange(e)}
                  />
                  <label>{this.state.grayscale}%</label>
                  <input
                    id="reset__grayscale"
                    type="button"
                    name="grayscale"
                    value="0"
                    className="hidden"
                    onClick={e => this.onFilterChange(e)}
                  />
                  <label className="reset__filter" title="reset ?" htmlFor="reset__grayscale">
                    <i className="fa fa-undo" />
                  </label>
                </div>
                <div className="filter__wrapper">
                  <label>invert </label>
                  <input
                    id="filter__invert"
                    type="range"
                    min="0"
                    max="100"
                    name="invert"
                    defaultValue="0"
                    value={this.state.invert}
                    step="1"
                    onChange={e => this.onFilterChange(e)}
                  />
                  <label>{this.state.invert}%</label>
                  <input
                    id="reset__invert"
                    type="button"
                    name="invert"
                    value="0"
                    className="hidden"
                    onClick={e => this.onFilterChange(e)}
                  />
                  <label className="reset__filter" title="reset ?" htmlFor="reset__invert">
                    <i className="fa fa-undo" />
                  </label>
                </div>
                <div className="filter__wrapper">
                  <label>opacity </label>
                  <input
                    id="filter__opacity"
                    type="range"
                    min="0"
                    max="1"
                    name="opacity"
                    defaultValue="1"
                    value={this.state.opacity}
                    step="0.1"
                    onChange={e => this.onFilterChange(e)}
                  />
                  <label>{this.state.opacity}</label>
                  <input
                    id="reset__opacity"
                    type="button"
                    name="opacity"
                    value="1"
                    className="hidden"
                    onClick={e => this.onFilterChange(e)}
                  />
                  <label className="reset__filter" title="reset ?" htmlFor="reset__opacity">
                    <i className="fa fa-undo" />
                  </label>
                </div>
                <div className="filter__wrapper">
                  <label>saturate </label>
                  <input
                    id="filter__saturate"
                    type="range"
                    min="0"
                    max="100"
                    name="saturate"
                    defaultValue="1"
                    value={this.state.saturate}
                    step="1"
                    onChange={e => this.onFilterChange(e)}
                  />
                  <label>{this.state.saturate}%</label>
                  <input
                    id="reset__saturate"
                    type="button"
                    name="saturate"
                    value="1"
                    className="hidden"
                    onClick={e => this.onFilterChange(e)}
                  />
                  <label className="reset__filter" title="reset ?" htmlFor="reset__saturate">
                    <i className="fa fa-undo" />
                  </label>
                </div>
                <div className="filter__wrapper">
                  <label>sepia </label>
                  <input
                    id="filter__sepia"
                    type="range"
                    min="0"
                    max="100"
                    name="sepia"
                    defaultValue="0"
                    value={this.state.sepia}
                    step="1"
                    onChange={e => this.onFilterChange(e)}
                  />
                  <label>{this.state.sepia}%</label>
                  <input
                    id="reset__sepia"
                    type="button"
                    name="sepia"
                    value="0"
                    className="hidden"
                    onClick={e => this.onFilterChange(e)}
                  />
                  <label className="reset__filter" title="reset ?" htmlFor="reset__sepia">
                    <i className="fa fa-undo" />
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="relative inline-block">
            <button onClick={this.onDownloadImage}>Download</button>
          </div>
        </div>
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
              className="hidden"
              type="checkbox"
              name="fontWeight"
              value={activeStyle.fontWeight === 'bold' ? 'normal' : 'bold'}
              onChange={e => this.onTextStyleChange(e)}
            />
            <label className="btn" htmlFor="text__bold">
              <i className="fa fa-bold" />
            </label>

            <input
              id="text__italic"
              checked={activeStyle.fontStyle === 'italic'}
              className="hidden"
              type="checkbox"
              name="fontStyle"
              value={activeStyle.fontStyle === 'italic' ? 'normal' : 'italic'}
              onChange={e => this.onTextStyleChange(e)}
            />
            <label className="btn" htmlFor="text__italic">
              <i className="fa fa-italic" />
            </label>

            <input
              id="text__left"
              checked={activeStyle.textAlign === 'left'}
              className="hidden"
              type="radio"
              name="textAlign"
              value="left"
              onChange={e => this.onTextStyleChange(e)}
            />
            <label className="btn" htmlFor="text__left">
              <i className="fa fa-align-left" />
            </label>

            <input
              id="text__middle"
              checked={activeStyle.textAlign === 'center'}
              className="hidden"
              type="radio"
              name="textAlign"
              value="center"
              onChange={e => this.onTextStyleChange(e)}
            />
            <label className="btn" htmlFor="text__middle">
              <i className="fa fa-align-center" />
            </label>

            <input
              id="text__right"
              checked={activeStyle.textAlign === 'right'}
              className="hidden"
              type="radio"
              name="textAlign"
              value="right"
              onChange={e => this.onTextStyleChange(e)}
            />
            <label className="btn" htmlFor="text__right">
              <i className="fa fa-align-right" />
            </label>
          </div>
        )}
        {activeType === 'text' && (
        <div
          className={'inline common__editor__tool'}
        >
          <label className="btn" onClick={this.deleteSticker}>
            <i className="fa fa-trash" />
          </label>
        </div>)}
      </div>
    )
  }
}

const mapStateToProps = ({ imageEditor: { activeSticker, isBackgroundImageSelected } }) => ({
  activeSticker,
  isBackgroundImageSelected,
})
export default connect(mapStateToProps)(TextEditorTool)
/*  optimise using loop for same repeated elements */
