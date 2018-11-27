import React, { Component } from 'react';
import ListItems from './ListItems';
import '../App.css';

export default class VenueList extends Component {

    render() {
        return (
            <ul className="venueList">
			{this.props.sites &&
				this.props.sites.map((site, idx) => (
					<ListItems key={idx} {...site} />
					))}
			</ul>
        );
    }
}