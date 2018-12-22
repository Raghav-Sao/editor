import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import filterData from './data'
import Style from './Style.css'

class SidebarFilter extends Component {
  change = (event, key) => {
    this.props.dispatch({
      type: key.toUpperCase(),
      payload: {
        [key.toLowerCase()]: {
          [event.target.name]: event.target.checked,
          Green: true,
        },
      },
    })
  }

  render() {
    console.log(this.props.galleryReducer.color.Red)
    return (
      <div className="row container__sidebar__filter">
        {Object.keys(filterData).map(key => (
          <Fragment>
            <div>{key}</div>
            {filterData[key].map((filter, index) => (
              <label className="row pointer filter">
                <input
                  id={index}
                  type="checkbox"
                  name={filter}
                  checked={this.props.galleryReducer[key.toLowerCase()][filter]}
                  onClick={event => this.change(event, key)}
                />
                <span>{filter}</span>
              </label>
            ))}
            <div className="border" />
          </Fragment>
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ galleryReducer }) => ({ galleryReducer })
export default connect(mapStateToProps)(SidebarFilter)
