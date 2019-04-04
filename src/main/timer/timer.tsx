import React, { Component } from 'react'

export default class Timer extends Component<{time: number}> {
    constructor(props: {time: number}) {
        super(props);
    }

    render() {
        return (
            <section className="timer">
                {this.props.time}
            </section>
        )
    }
}