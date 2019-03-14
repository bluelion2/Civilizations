import React, { Component } from 'react';

export default class Input extends Component {
    
    state = {
        location: ''
    }

    input(event: any) {
        this.setState({
            location: event.target.value
        })
    }

    submit = (event: any) => {
        event.preventDefault();
        console.log(this.state.location);
        console.log(this.props);
    }

    render() {
        return (
            <form onSubmit={this.submit}>
                input component
                <input type="text" placeholder="search location" value={this.state.location} onChange={() => this.input(event)}></input>
                <button type="submit">Search</button>
            </form>
        )
    }
}