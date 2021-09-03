import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ loginHandler }) {
    const history = useHistory();
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    const inputHandler = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };

    const loginRequestHandler = () => {
        axios
            .post(
                'https://localhost:80/login',
                {
                    email: loginInfo.email,
                    password: loginInfo.password,
                },
                { 'Content-Type': 'application/json', withCredentials: true },
            )
            .then((res) => {
                if (res.message === 'ok') {
                    loginHandler();
                    window.location.replace('/');
                }
            })
            .catch((err) => alert(err));
    };
    return (
        <>
            <div className="back">
                <div className="loginModal">
                    <Link to="/" className="closeB">
                        X
                    </Link>
                    <div className="modalContents">
                        <span className="title">Login</span>
                        <input
                            name="email"
                            className="loginId"
                            type="text"
                            placeholder="email"
                            onChange={(e) => inputHandler(e)}
                            value={loginInfo.email}
                        />
                        <input
                            name="password"
                            className="loginPw"
                            type="password"
                            placeholder="password"
                            onChange={(e) => inputHandler(e)}
                            value={loginInfo.password}
                        />
                        <button className="loginBtn" onClick={loginRequestHandler}>
                            로그인
                        </button>
                        <div className="signUpLine">
                            회원이 아니신가요?
                            <Link to="/signup">
                                <button className="link">회원가입</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
