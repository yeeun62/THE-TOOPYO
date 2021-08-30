import React, { useState } from 'react';
import '../../pages/signup/SignUp.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Signup({ isOpen, close, loginHandler }) {
    const [signupInfo, setSignupInfo] = useState({
        profile_img: '',
        provider: '',
        nickName: '',
        email: '',
        password: '',
        phoneNumber: '',
    });

    const history = useHistory();

    const fileEvent = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            setSignupInfo({ ...signupInfo, [e.target.name]: e.target.profile_img });
            console.log('파일 업로드 완료.');
        };
        reader.readAsText(e.target.files[0]);
    };

    const inputHandler = (e) => {
        setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
    };

    const signUpRequestHandler = () => {
        if (
            // !signupInfo.profile_img ||
            // !signupInfo.provider ||
            !signupInfo.nickName ||
            !signupInfo.email ||
            !signupInfo.password ||
            !signupInfo.phoneNumber
        ) {
        } else {
            axios
                .post(
                    'https://localhost:80/signup',
                    {
                        profile_img: 'dddd',
                        provider: signupInfo.provider,
                        nickName: signupInfo.nickName,
                        email: signupInfo.email,
                        password: signupInfo.password,
                        phoneNumber: signupInfo.phoneNumber,
                    },
                    { 'Content-Type': 'application/json', withCredentials: true },
                )
                .then((res) => {
                    history.push('/');
                    if (res.message === 'ok') return loginHandler(true);
                });
        }
    };
    return (
        <>
            {isOpen === true ? (
                <div className="ModalBack">
                    <div className="signupModal">
                        <button className="closeBtn" onClick={close}>
                            X
                        </button>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="modalContents">
                                <img className="signUpIcon" />
                                <span className="title">Sign Up</span>
                                <div>모든 항목은 필수입니다.</div>
                                <input
                                    name="email"
                                    className="signUpId"
                                    type="email"
                                    placeholder="email"
                                    onChange={(e) => inputHandler(e)}
                                    value={signupInfo.email}
                                />
                                <input
                                    name="password"
                                    className="signUpPw"
                                    type="password"
                                    placeholder="password"
                                    onChange={(e) => inputHandler(e)}
                                    value={signupInfo.password}
                                />
                                <input
                                    name="nickName"
                                    className="signUpNickName"
                                    type="text"
                                    placeholder="nickname"
                                    onChange={(e) => inputHandler(e)}
                                    value={signupInfo.nickName}
                                />
                                <input
                                    name="phoneNumber"
                                    className="signUpMobile"
                                    type="tel"
                                    placeholder="-없이 숫자만 입력하세요"
                                    onChange={(e) => inputHandler(e)}
                                    value={signupInfo.phoneNumber}
                                />
                                <div className="profileUploader">프로필 사진을 선택하세요.</div>
                                <input
                                    name="profile_img"
                                    className="signUpPic"
                                    type="file"
                                    onChange={fileEvent}
                                    value={signupInfo.profile_img}
                                />
                                <button className="signUpB" onClick={signUpRequestHandler}>
                                    {' '}
                                    회원가입
                                </button>
                                <div className="loginLine"></div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Signup;
