import React, { Component } from 'react'
import './header.scss'

export default class Header extends Component<{title: string}> {
    constructor(props: {title: string}) {
        super(props);
    }

    render() {
        return (
            <section className="header">
                <h3>목표 : {this.props.title}</h3>
            </section>
        )
    }
}
