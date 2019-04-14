import React, { Component } from 'react'
import './header.scss'

export default class Header extends Component<{title: string, time: number}> {
    constructor(props: {title: string, time: number}) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <section className="header">
                <h3>목표 : {this.props.title}</h3>
                <p>시간 : {this.props.time}</p>
            </section>
        )
    }
}