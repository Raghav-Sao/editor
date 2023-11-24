import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Checkbox, Divider, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

import filterData from './data'
import Style from './Style.scss'

class SidebarFilter extends Component {
  change = (event, { checked, label }, filterKey) => {
    debugger
    this.props.dispatch({
      type: filterKey.toUpperCase(),
      payload: {
        [filterKey.toLowerCase()]: {
          [label]: checked,
        },
      },
    })
    console.warn(this.props)
  }

  render() {
    return (
      <div className="p-r-0 sidebar__filter" width={3}>
        {Object.keys(filterData).map(filterKey => (
          <Fragment key={filterKey}>
            <div>{filterKey}</div>
            {filterData[filterKey].map((filter, index) => (
              <Checkbox
                key={`${filterKey}-${index}`}
                label={filter}
                onClick={(event, data) => this.change(event, data, filterKey)}
                className="block m-10"
                checked={this.props[filterKey.toLowerCase()][filter]}
              />
            ))}
            <Divider />
          </Fragment>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state, 'state')
  return state.galleryReducer
}
export default withRouter(connect(mapStateToProps)(SidebarFilter))
