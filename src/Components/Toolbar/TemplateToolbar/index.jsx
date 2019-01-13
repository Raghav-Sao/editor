import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Image, Grid } from 'semantic-ui-react'

import { actionCreator } from 'store/actionCreator'
import placeholderImage from 'assests/images/placeholder-image.jpg'

class TemplateToolbar extends PureComponent {
  showTemplate = ({ _id }) => {
    this.props.dispatch(actionCreator.FETCH_EDITOR_CARD({ _id }))
  }

  render() {
    const {
      props: { templates },
    } = this
    return (
      <div className="template__toolbar__container">
        {Object.keys(templates).map(key => (
          <Image src={placeholderImage} onClick={() => this.showTemplate(templates[key])} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ templateReducer: templates }) => ({
  templates,
})

export default connect(mapStateToProps)(TemplateToolbar)
