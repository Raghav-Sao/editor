import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Button, Dropdown, Grid, Icon, Label, Popup } from 'semantic-ui-react'
import { SketchPicker } from 'react-color'

import { actionCreator } from 'store/actionCreator'
import './Style.css'

class EditorTextToolbar extends Component {
  constructor(props) {
    super(props)
    this.state = { showColorPalette: true }
  }

  deleteSticker = _id => {
    this.props.dispatch(actionCreator.DELETE_STICKER({ _id }))
  }

  getFontSizeOptions = () =>
    [...Array(20)].map((x, i) => (
      <Dropdown.Item
        key={i}
        value={i + 10}
        selected={
          this.props.activeSticker.styles && i + 10 === this.props.activeSticker.styles.fontSize
        }
        onClick={this.onTextFontSizeChange}
      >{`${i + 10}px`}</Dropdown.Item>
    ))
  handleColorChanges = color => {
    const styles = {
      color: color.hex,
    }
    this.props.dispatch(actionCreator.CHANGE_TEXT_STICKER_STYLE({ styles }))
  }

  onTextStyleChange = e => {
    this.props.dispatch(
      actionCreator.CHANGE_TEXT_STICKER_STYLE({
        styles: { [e.currentTarget.name]: e.currentTarget.value },
        cardIndex: 0,
      })
    )
  }

  onTextFontSizeChange = (e, data) => {
    this.props.dispatch(
      actionCreator.CHANGE_TEXT_STICKER_STYLE({
        styles: { fontSize: data.value },
        cardIndex: 0,
      })
    )
  }

  toggleTextAlignFilter = () => {
    this.setState(prevState => ({
      showTextAlignFilter: !prevState.showTextAlignFilter,
    }))
  }

  preventPropagation = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  onDownloadImage = () => {
    const canvas = document.createElement('canvas')
    const htmlElement = document.querySelector('#iii')
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
    const image = document.createElement('img')
    console.log(html)
    image.src = 'data:image/svg+xml; charset=utf8, ' + data
    setTimeout(() => {
      //image.onload = () => {
      ctx.drawImage(image, 0, 0)
      const outputDataURI = canvas.toDataURL()
      var link = document.createElement('a')
      link.download = 'name.png'
      link.href = outputDataURI
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      //}
    }, 1000)
  }

  render() {
    const {
      props: {
        activeSticker: { styles: activeStyle = {}, type: activeType },
      },
    } = this

    return (
      <Fragment>
        <div className="editor__text__toolbar__container" onClick={e => this.preventPropagation(e)}>
          <Button onClick={this.onDownloadImage}>Download</Button>
          <Fragment>
            <Popup
              trigger={
                <label className="ui button icon active" style={{ color: activeStyle.color }}>
                  <Icon name="paint brush" />
                </label>
              }
              position="bottom center"
              on={['hover']}
              flowing
              hoverable
            >
              <SketchPicker color={activeStyle.color} onChangeComplete={this.handleColorChanges} />
            </Popup>
          </Fragment>
          {activeType === 'text' && (
            <Fragment>
              <Fragment>
                <input
                  id="text__bold"
                  checked={activeStyle.fontWeight === 'bold'}
                  className="hidden"
                  type="checkbox"
                  name="fontWeight"
                  value={activeStyle.fontWeight === 'bold' ? 'normal' : 'bold'}
                  onChange={e => this.onTextStyleChange(e)}
                />
                <label htmlFor="text__bold" className="ui button icon">
                  <Icon name="bold" />
                </label>
              </Fragment>
              <Fragment>
                <input
                  id="text__italic"
                  checked={activeStyle.fontStyle === 'italic'}
                  className="hidden"
                  type="checkbox"
                  name="fontStyle"
                  value={activeStyle.fontStyle === 'italic' ? 'normal' : 'italic'}
                  onChange={e => this.onTextStyleChange(e)}
                />
                <label htmlFor="text__italic" className="ui button icon">
                  <Icon name="italic" />
                </label>
              </Fragment>
              <Fragment>
                <Popup
                  className="text__align__container"
                  trigger={
                    <label htmlFor="text__align__container" className="ui button icon active">
                      <Icon name={`align ${activeStyle.textAlign}`} />
                    </label>
                  }
                  position="bottom center"
                  on={['hover', 'click']}
                  flowing
                  hoverable
                >
                  <input
                    id="text__left"
                    checked={activeStyle.textAlign === 'left'}
                    className="hidden"
                    type="radio"
                    name="textAlign"
                    value="left"
                    onChange={e => {
                      this.onTextStyleChange(e), this.toggleTextAlignFilter()
                    }}
                  />
                  <label className="ui button icon" htmlFor="text__left">
                    <Icon name="align left" />
                  </label>
                  <input
                    id="text__middle"
                    checked={activeStyle.textAlign === 'center'}
                    className="hidden"
                    type="radio"
                    name="textAlign"
                    value="center"
                    onChange={e => {
                      this.onTextStyleChange(e), this.toggleTextAlignFilter()
                    }}
                  />
                  <label className="ui button icon" htmlFor="text__middle">
                    <Icon name="align center" />
                  </label>

                  <input
                    id="text__right"
                    checked={activeStyle.textAlign === 'right'}
                    className="hidden"
                    type="radio"
                    name="textAlign"
                    value="right"
                    onChange={e => {
                      this.onTextStyleChange(e), this.toggleTextAlignFilter()
                    }}
                  />
                  <label className="ui button icon" htmlFor="text__right">
                    <Icon name="align right" />
                  </label>
                </Popup>
              </Fragment>
              <Fragment>
                <Dropdown
                  options={this.getFontSizeOptions()}
                  selection
                  text={`${activeStyle.fontSize}`}
                  style={{ margin: '0 .25em 0 0' }}
                />
              </Fragment>
            </Fragment>
          )}

          <Fragment>
            <label className="ui button icon" onClick={this.deleteSticker}>
              <Icon name="trash alternate" />
            </label>
          </Fragment>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ editorSpace: { activeSticker } }) => ({ activeSticker })

export default connect(mapStateToProps)(EditorTextToolbar)
