import React, { Component } from 'react';

export default class Maps extends Component<{lat: number, lng: number}> {

    state = {
        lat: 0,
        lng: 0,
        text: '',
    }
    constructor(props: {lat: number, lng: number}) {
        super(props);
        // this.state = {
        //     lat: props.lat,
        //     lng: props.lng,
        // }
    }

    upTo() {

    }

    render() {
        return(
            <div>
            </div>
        );
    }

}

