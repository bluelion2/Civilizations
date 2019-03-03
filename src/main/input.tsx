import React, { Component } from 'react';

export default class Input extends Component {
    
    text: string = '';
    state = {
        location: ''
    }

    input() {
        this.setState({
            location: this.text
        })
    }

    click() {

    }

    render() {
        return (
            <div>
                input component
                <input type="text" placeholder="search location" value={this.text} onChange={() => this.input()}>
                </input>
                <button type="button" onClick={() => this.click()}>Search</button>
            </div>
           
        )
    }
}