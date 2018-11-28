import React, { Component } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        //Use data in different places use state
        this.state = {
            sites: [],
            markers: [],
            updateSuperState: obj => {
                this.setState(obj);
            }
        };
    }
    //calling the function
    componentDidMount() {
        this.getLocations()
        //this.showMap()
    }

    showMap = () => {
        addJsScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBfiZP_S5wpf3AHIkbVcVEnqcWgDRcGYRY&callback=initMap")
        window.initMap = this.initMap
    }

    //get the base url and append the query parameter to it find th exact lat and long in form of json abject
    getLocations = () => {
        const baseUrl = "https://api.foursquare.com/v2/venues/search?"
        const params = {
            client_id: "RMUZLEACYYV2TOWXVNFTDFOTV11JTY4X3U4KKNDXMLDY2423",
            client_secret: "4AMQJSZIFGDXNKNIC120UOOMADB3CTJVDHZYOYB5Y2M2ITPX",
            query: "coffee",
            ll: "33.75,-84.38",
            near: "Atlanta",
            v: "20181120",
            limit: 10,
            radius: 2000
        }


        //Performing a GET request
        axios.get(baseUrl + new URLSearchParams(params))
            .then(response => {
                this.setState({
                    sites: response.data.response.venues

                }, this.showMap())
                //console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    //check for the marker default behaviour  
    closeAllMarkers = () => {
        const markers = this.state.markers.map(marker => {
            marker.isOpen = false;
            return marker;
        });

    }

    handleMarkerClick = (marker) => {
        //close any markers open
        this.closeAllMarkers();
        marker.isOpen = true;
        this.setState({ markers: Object.assign(this.state.markers, marker) })
        // venue is venue that venue.id === marker.id
        const venue = this.state.sites.find(favCoffeeSite => favCoffeeSite.id === marker.id);
        axios.getVenueDetails(marker.id)


    };

    // handleListItemClick = (name) => {
    //     const marker = this.state.markers.find(marker => marker.id === favCoffeeSite.id);
    //     this.handleMarkerClick(marker);
    //     console.log(name);
    // };


    //https://developers.google.com/maps/documentation/javascript/tutorial
    //lat and long of georgia state
    initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 33.247875, lng: -83.441162 },
            zoom: 5
        })

        //info window
        const infowindow = new window.google.maps.InfoWindow()
        const markersArr = [];
        //loop over each site present in the sites array we have run a foreach/map
        this.state.sites.forEach(favCoffeeSite => {
            const content = '<div id="contentBox">' +
                '<img class="imageDisplay" src="' + favCoffeeSite.categories[0].icon.prefix + '32' + favCoffeeSite.categories[0].icon.suffix + '"/>' +
                '<p><b>' + favCoffeeSite.name + '</b></p><p>' + favCoffeeSite.location.address + '</p></div>';

            var marker = new window.google.maps.Marker({
                position: { lat: favCoffeeSite.location.lat, lng: favCoffeeSite.location.lng },
                map: map,
                title: favCoffeeSite.name,
                id: favCoffeeSite.id
            });
            markersArr.push(marker);
            //https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
            marker.addListener('click', function() {
                infowindow.setContent(content)
                //console.log(marker.id);
                infowindow.open(map, marker)
            })
        })
        console.log(markersArr);
        this.setState({ markers: markersArr });
    }

    render() {
        return (
            <main className="App">
            <SideBar
            {...this.state} 
            handleListItemClick={this.handleListItemClick} />
            <div id="map">
            </div>
            </main>
        )
    }
}

//call the javascript lib
function addJsScript(url) {
    const firstItem = window.document.getElementsByTagName("script")[0]
    const secondItem = window.document.createElement("script")
    secondItem.src = url
    secondItem.async = true
    secondItem.defer = true
    firstItem.parentNode.insertBefore(secondItem, firstItem)
}

export default App;

//my api key AIzaSyBfiZP_S5wpf3AHIkbVcVEnqcWgDRcGYRY
//Client ID RMUZLEACYYV2TOWXVNFTDFOTV11JTY4X3U4KKNDXMLDY2423
//Client Secret 4AMQJSZIFGDXNKNIC120UOOMADB3CTJVDHZYOYB5Y2M2ITPX