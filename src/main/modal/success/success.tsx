import React, { Component } from 'react'
import { Modal, Button } from '@material-ui/core';
import './success.scss';

export default class Success extends Component {
    constructor(props: any) {
        super(props)
    }

    state = {
        modal: true,
    }

    closeModal = () => {
        this.setState({
            modal: false,
        })
    }

    render(): JSX.Element {
        return (
            <Modal open={this.state.modal}>
                <section className="success">
                    <Button onClick={this.closeModal}>닫기</Button>
                    <h4>성공하셨습니다!</h4>
                    <p>로그인을 하시면 기록을 저장할 수 있습니다.</p>
                    <div className="button-box">
                        <Button>로그인하기</Button>
                    </div>
                </section>
            </Modal>
        )
    }
}