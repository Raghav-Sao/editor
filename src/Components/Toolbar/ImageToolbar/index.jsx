import React, { Component } from 'react'
import { connect } from 'react-redux'
import SVG from 'react-inlinesvg'

import { Grid, Image } from 'semantic-ui-react'
import './Style.css'

class ImageToolbar extends Component {
  render() {
    const {
      props: { imageStickers },
    } = this
    return (
      <div className="image__toolbar__container">
        <Grid columns="two">
          <Grid.Row>
            {imageStickers.map(svg => (
              <Grid.Column>
                <div className="image__toolbar">
                  <SVG src={svg}>
                    <Image src={svg} />
                  </SVG>
                </div>
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ editorSpace: { imageStickers } }) => ({ imageStickers })
export default connect(mapStateToProps)(ImageToolbar)
