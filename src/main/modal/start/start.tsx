import React, { Component } from 'react'
import { Modal, Button, Input } from '@material-ui/core';
import './start.scss';

export default class Start extends Component<any> {

    constructor(props: any) {
        super(props);
    }

    state = {
        modal: true,
        user: ''
    }

    closeModal = (e: any): void => {
        e.preventDefault();
        this.props.onClick(this.state.user);
        this.setState({
            modal: false
        })
    }

    changeName = (e: any): void => {
        this.setState({
            user: e.target.value
        })
    }

    render(): JSX.Element {
        return (
            <Modal open={this.state.modal}>
                <div className="start">
                    <h4>게임을 시작합니다!</h4>
                    <Input onChange={this.changeName} placeholder="이름을 입력해주세요."></Input>
                    <Button disabled={this.state.user == ''} onClick={this.closeModal}>시작하기</Button>
                </div>
            </Modal>
        )
    }
}