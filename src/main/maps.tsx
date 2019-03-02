import React, { Component } from 'react';

export default class Maps extends Component<{lat: number, lan: number}> {

    constructor(props: {lat: number, lan: number}) {
        super(props);
        this.state = {
            lat: props.lat,
            lan: props.lan
        }
    }

    render() {
        return(
            <div className="maps-container" id="map">
            </div>
        );
    }

}
