import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreator } from '../../store/actionCreator'

import Style from './Style.css'

class TextEditorTool extends Component {
  componentDidMount() {
    document.addEventListener('click', this.deactiveSticker)
  }

  onTextStyleChange = e => {
    debugger
    console.log({ [e.currentTarget.name]: e.currentTarget.value })
    this.props.dispatch(
      actionCreator.CHANGE_TEXT_STICKER_STYLE({
        style: { [e.currentTarget.name]: e.currentTarget.value },
      })
    )

    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  render() {
    const { activeSticker: { style: activeStyle = {}, type: activeType } } = this.props
    debugger

    return (
      <div className={`col-9 text__editor__tool ${activeType === 'text' ? 'active': ''}`}>
        <input
          id="left"
          checked={activeStyle.fontWeight === 'bold'}
          type="checkbox"
          name="fontWeight"
          value={activeStyle.fontWeight === 'bold' ? 'normal' : 'bold'}
          onChange={e => this.onTextStyleChange(e)}
        />
        <label class="btn" for="left">
          <i className="fa fa-bold" />
        </label>

        <input
          id="middle"
          checked={activeStyle.fontStyle === 'italic'}
          type="checkbox"
          name="fontStyle"
          value={activeStyle.fontStyle === 'italic' ? 'normal' : 'italic'}
          onChange={e => this.onTextStyleChange(e)}
        />
        <label class="btn" for="middle">
          <i className="fa fa-italic" />
        </label>

        <input
          id="left"
          checked={activeStyle.textAlign === 'left'}
          type="radio"
          name="textAlign"
          value="left"
          onChange={e => this.onTextStyleChange(e)}
        />
        <label class="btn" for="left">
          <i className="fa fa-align-left" />
        </label>

        <input
          id="middle"
          checked={activeStyle.textAlign === 'center'}
          type="radio"
          name="textAlign"
          value="center"
          onChange={e => this.onTextStyleChange(e)}
        />
        <label class="btn" for="middle">
          <i className="fa fa-align-center" />
        </label>

        <input
          id="right"
          checked={activeStyle.textAlign === 'right'}
          type="radio"
          name="textAlign"
          value="right"
          onChange={e => this.onTextStyleChange(e)}
        />
        <label class="btn" for="right">
          <i className="fa fa-align-right" />
        </label>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  activeSticker: state.imageEditor.activeSticker,
})
export default connect(mapStateToProps)(TextEditorTool)
