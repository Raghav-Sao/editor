import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Dropdown, Grid, Icon, Label, Popup } from 'semantic-ui-react'
import { SketchPicker } from 'react-color'
import { actionCreator } from 'store/actionCreator';

import './Style.scss'

class EditorTextToolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      documentColors: ['#f00', '#0f0', '#00f'],
    }
  }

  deleteSticker = _id => {
    this.props.onToolbarActivity('DELETE', this.props.activeSticker);
  }

  setDocumentColorPallete = () => {
    const {
        props: {
          activeSticker: { cardIndex = null },
        },
      } = this,
      documentColors = []
    if (cardIndex === 0 || cardIndex)
      document
        .getElementsByClassName('template_container')
        [cardIndex].childNodes.forEach(
          ({ style: { color, fill } }) =>
            color || fill ? documentColors.push(color) : console.log(color || fill)
        )

    this.setState({
      documentColors: [...new Set(documentColors)],
    })
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
    ));

  handleColorChanges = color => {
    const styles = {
      color: color.hex,
    }
    this.props.onToolbarActivity('STYLE_CHANGE', this.props.activeSticker, styles);
    setTimeout(this.setDocumentColorPallete)
  }

  onTextStyleChange = e => {
    const style = { [e.currentTarget.name]: e.currentTarget.value };
    this.props.onToolbarActivity('TEXT_STYLE_CHANGE', this.props.activeSticker, style)
  }

  onTextFontSizeChange = (e, data) => {
    const style = { fontSize: data.value };
    this.props.onToolbarActivity('TEXT_FONT_CHANGE', this.props.activeSticker, style)
  }

  toggleTextAlignFilter = () => {
    this.setState(prevState => ({
      showTextAlignFilter: !prevState.showTextAlignFilter,
    }));
  }

  preventPropagation = e => {
    e.stopPropagation();
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
    image.src = 'data:image/svg+xml; charset=utf8, ' + data
    setTimeout(() => {
      ctx.drawImage(image, 0, 0)
      const outputDataURI = canvas.toDataURL()
      var link = document.createElement('a')
      link.download = 'name.png'
      link.href = outputDataURI
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }, 1000);
  }

  saveChanges = () => {
    this.props.onToolbarActivity('SAVE', this.props.activeSticker);
  }

  render() {
    const {
      props: {
        activeSticker: { styles: activeStyle = {}, type: activeType },
      },
    } = this;
    console.log(activeStyle, activeType);
    return (
      <Fragment>
        <div
          className="editor__text__toolbar__container"
          onClick={e => {
            this.preventPropagation(e)
            console.log('click')
          }}
        >
          <Button onClick={this.saveChanges.bind(this)}>Save</Button>
          <Fragment>
            <Popup
              trigger={
                <label className="ui button icon active" style={{ color: activeStyle.color }}>
                  <Icon name="paint brush" />
                </label>
              }
              position="bottom center"
              on={['hover']}
              onOpen={this.setDocumentColorPallete}
              hoverable
            >
              <div className="color_palletee__container">
                <Divider horizontal>Document Color</Divider>
                <div className="document_color__container">
                  {this.state.documentColors.map(color => (
                    <span
                      style={{
                        backgroundColor: color,
                        width: '25px',
                        height: '25px',
                        display: 'inline-block',
                      }}
                      onClick={() => this.handleColorChanges({ hex: color })}
                      key={color}
                    />
                  ))}
                </div>
                <Divider horizontal>Default Color</Divider>

                <SketchPicker
                  color={activeStyle.color}
                  onChangeComplete={this.handleColorChanges}
                />
              </div>
            </Popup>
          </Fragment>
          {activeType === 'text' && (
            <Fragment>
              <Fragment>
                <input
                  id="text__bold"
                  checked={activeStyle.fontWeight === 'bold'}
                  className="display--none"
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
                  className="display--none"
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
                    className="display--none"
                    type="radio"
                    name="textAlign"
                    value="left"
                    onChange={e => {
                      this.onTextStyleChange(e); this.toggleTextAlignFilter()
                    }}
                  />
                  <label className="ui button icon" htmlFor="text__left">
                    <Icon name="align left" />
                  </label>
                  <input
                    id="text__middle"
                    checked={activeStyle.textAlign === 'center'}
                    className="display--none"
                    type="radio"
                    name="textAlign"
                    value="center"
                    onChange={e => {
                      this.onTextStyleChange(e); this.toggleTextAlignFilter()
                    }}
                  />
                  <label className="ui button icon" htmlFor="text__middle">
                    <Icon name="align center" />
                  </label>

                  <input
                    id="text__right"
                    checked={activeStyle.textAlign === 'right'}
                    className="display--none"
                    type="radio"
                    name="textAlign"
                    value="right"
                    onChange={e => {
                      this.onTextStyleChange(e); this.toggleTextAlignFilter()
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
                  onClick={this.preventPropagation}
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

export default EditorTextToolbar;
