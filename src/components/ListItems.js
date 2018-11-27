import React, { Component } from 'react';
import '../App.css';

export default class ListItems extends Component {

    render() {
        return (
            <li className='list'
            aria-labelledby={this.props.name}
            onClick={() => this.props.handleListItemClick(this.props)}
            >
          <p> {this.props.name} </p>
      </li>
        );
    }
}