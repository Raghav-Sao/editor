import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditorTextToolbar from './EditorTextToolbar';
import './Style.scss';

class EditorToolbar extends Component {
  render() {
    const activeSticker = this.props.activeSticker;
    return (
      <div className={`editor__toolbar__container ${activeSticker.type ? 'active' : ''}`}>
        <EditorTextToolbar {...this.props} />
      </div>
    )
  }
}

export default EditorToolbar;
