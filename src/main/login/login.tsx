import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';


export default class Login extends Component {

    render() {
        return (
            <section>
                <Input placeholder="아이디를 입력해주세요."></Input>
                <Input placeholder="비밀번호를 입력해주세요."></Input>
                <Button>로그인하기</Button>
            </section>
        );
    }
}