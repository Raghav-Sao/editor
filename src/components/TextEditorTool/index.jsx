import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreator } from '../../store/actionCreator'

import Style from './Style.css'

class TextEditorTool extends Component {
  state = { textAlign: 'right' }
  componentDidMount() {
    document.addEventListener('click', this.deactiveSticker)
  }

  activeSticker = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.setState({ isEditable: true })
  }

  deactiveSticker = () => {
    this.setState({ isEditable: false })
  }

  onTextStyleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value }, () => console.log(this.state))
  }

  render() {
    // const { connectDragSource, data: { id, style, text, src } } = this.props

    return (
      <div className="text__editor__tool">
        <input
          id="left"
          checked={this.state.fontWeight === 'bold'}
          type="checkbox"
          name="fontWeight"
          value={this.state.fontWeight === 'bold' ? 'normal' : 'bold'}
          onChange={e => this.onTextStyleChange(e)}
        />
        <label class="btn" for="left">
          <i className="fa fa-align-left" />
        </label>

        <input
          id="middle"
          checked={this.state.fontStyle === 'italic'}
          type="checkbox"
          name="fontStyle"
          value={this.state.fontStyle === 'italic' ? 'normal' : 'italic'}
          onChange={e => this.onTextStyleChange(e)}
        />
        <label class="btn" for="middle">
          <i className="fa fa-align-center" />
        </label>

        <input
          id="left"
          checked={this.state.textAlign === 'left'}
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
          checked={this.state.textAlign === 'center'}
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
          checked={this.state.textAlign === 'right'}
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
  stickers: state.imageEditor.sticker,
})
export default connect(mapStateToProps)(TextEditorTool)
