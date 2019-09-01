import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import TextToolbar from './TextToolbar'
import ImageToolbar from './ImageToolbar'
import TemplateToolbar from './TemplateToolbar'
import { general, language } from 'constant'

import './Style.css'

class Toolbar extends Component {
  getToolbar = type => {
    const { TEXT, IMAGE, TEMPLATES } = general[language]
    switch (type) {
      case TEXT: {
        return (
          <div className="text__toolbar__container">
            {this.props.textStickers.map((sticker, index) => (
              <TextToolbar sticker={sticker} index={index} />
            ))}
          </div>
        )
        break
      }

      case IMAGE: {
        return (
          <div className="image__toolbar__container">
            <Grid columns="two">
              <Grid.Row>
                {this.props.imageStickers.map((sticker, index) => (
                  <Grid.Column>
                    <ImageToolbar sticker={sticker} index={index} />
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </div>
        )
        break
      }

      case TEMPLATES: {
        return <TemplateToolbar />
      }
      default:
        return <div />
    }
  }
  render() {
    const {
      props: { type },
    } = this
    return this.getToolbar(type)
  }
}

const mapStateToProps = ({ editorSpace: { imageStickers, textStickers } }) => ({
  imageStickers,
  textStickers,
})

export default connect(mapStateToProps)(Toolbar)
