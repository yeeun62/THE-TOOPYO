import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ loginHandler }) {
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
                'https://localhost:4000/login',
                {
                    email: loginInfo.email,
                    password: loginInfo.password,
                },
                { 'Content-Type': 'application/json', withCredentials: true },
            )
            .then((res) => {
                if (res.message === 'ok') {
                    return loginHandler(res.cookies);
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
                        <button className="kakaoBtn" href={process.env.KAKAO_AUTH_URL}>
                            <img
                                className="kakaoLogo"
                                src="https://developers.kakao.com/tool/resource/static/img/button/kakaolink/kakaolink_btn_medium.png"
                            />
                            <div className="kakaoText">카카오 계정으로 가입</div>
                        </button>
                        <div className="signUpLine">
                            회원이 아니신가요?
                            <Link to="/signup">회원가입</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
