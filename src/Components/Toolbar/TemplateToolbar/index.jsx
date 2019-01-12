import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Image, Grid } from 'semantic-ui-react'

import placeholderImage from 'assests/images/placeholder-image.jpg'

class TemplateToolbar extends PureComponent {
  render() {
    return (
      <div className="template__toolbar__container">
        <Image src={placeholderImage} />
      </div>
    )
  }
}

const mapStateToProps = ({ templateReducer }) => ({
  templateReducer,
})

export default connect(mapStateToProps)(TemplateToolbar)
