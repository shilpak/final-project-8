import React, { Component } from 'react';
import VenueList from './VenueList';
import '../App.css';

export default class SideBar extends Component {

    render() {
        return (
            <div className='sideBar'>
                    <input type="text" id="searchBox" placeholder="Search Box" aria-labelledby="search"/>
                    <VenueList {...this.props} 
                    
                    />
               </div>
        );
    }
}