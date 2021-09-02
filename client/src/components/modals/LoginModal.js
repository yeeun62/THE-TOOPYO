import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Modal.css';

function Login({ isOpen, close, loginHandler }) {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });
    console.log(loginInfo);

    const inputHandler = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };

    const loginRequestHandler = () => {
        axios
            .post(
                'http://localhost:80/login',
                {
                    email: loginInfo.email,
                    password: loginInfo.password,
                },
                { withCredentials: true },
            )
            .then((res) => {
                if (res.data.message === 'ok') {
                    loginHandler(res);
                    window.location.reload();
                }
            })
            .catch((err) => alert(err));
    };
    return (
        <>
            {isOpen === true ? (
                <div className="modal">
                    <div className="loginModal">
                        <button className="closeBtn" onClick={close}>
                            X
                        </button>
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
                                    <button className="link" onClick={close}>
                                        회원가입
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Login;
