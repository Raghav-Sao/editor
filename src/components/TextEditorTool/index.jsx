import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actionCreator } from '../../store/actionCreator'
import Style from './Style.css'

class TextEditorTool extends Component {
  componentDidMount() {
    document.addEventListener('click', this.deactiveSticker)
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
    const { activeSticker: { style: activeStyle = {}, type: activeType } } = this.props

    return (
      <div
        className={`col-9 sticker__editor__tool ${activeType !== undefined ? 'active' : ''}`}
        onClick={e => this.preventPropagation(e)}
      >
        <div className={`text__editor__tool ${activeType === 'text' ? 'active' : ''}`}>
          <input
            id="text__bold"
            checked={activeStyle.fontWeight === 'bold'}
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
        <div className={`inline common__editor__tool ${activeType !== undefined ? 'active' : ''}`}>
          <label className="btn" onClick={this.deleteSticker}>
            <i className="fa fa-trash" />
          </label>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeSticker: state.imageEditor.activeSticker,
})
export default connect(mapStateToProps)(TextEditorTool)
