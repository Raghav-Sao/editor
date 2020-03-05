import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import { SORT_BY } from 'actions/galleryAction';

import Style from './Style.css';

class SortBy extends Component {
    handleSortbyChanges = ({ target: { name } }) => {
        this.props.dispatch({
            type: SORT_BY,
            payload: { sortBy: name },
        });
    };

    render() {
        const {
            props: {
                galleryReducer: { sortBy },
            },
        } = this;
        return (
            <div className="row sortby__filter__container">
                <span className="sortby__filter">Sort By:</span>
                <input
                    id="sortby__low__to__high"
                    className="dispaly--none"
                    type="checkbox"
                    group="sortby__price"
                    onChange={this.handleSortbyChanges}
                    name="priceLowToHigh"
                    checked={sortBy === 'priceLowToHigh'}
                />
                <label htmlFor="sortby__low__to__high" className="sortby__filter">
                    Price: Low to High
                </label>
                <input
                    id="sortby__high__to__low"
                    className="dispaly--none"
                    type="checkbox"
                    group="sortby__price"
                    onChange={this.handleSortbyChanges}
                    name="priceHighToLow"
                    checked={sortBy === 'priceHighToLow'}
                />
                <label htmlFor="sortby__high__to__low" className="sortby__filter">
                    Price: High to Low
                </label>
                <input
                    id="sortby__Popularity"
                    className="dispaly--none"
                    type="checkbox"
                    onChange={this.handleSortbyChanges}
                    name="popularity"
                    checked={sortBy === 'popularity'}
                />
                <label htmlFor="sortby__Popularity" className="sortby__filter">
                    Popularity
                </label>
                <input
                    id="sortby__new"
                    className="dispaly--none"
                    type="checkbox"
                    name="new"
                    checked={sortBy === 'new'}
                    onChange={this.handleSortbyChanges}
                />
                <label htmlFor="sortby__new" className="sortby__filter" name="popularity">
                    New Design
                </label>
            </div>
        );
    }
}

const mapStateToProps = ({ galleryReducer }) => ({ galleryReducer });
export default connect(mapStateToProps)(SortBy);
