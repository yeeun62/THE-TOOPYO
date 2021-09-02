import React, { useState } from 'react';
import '../../pages/signup/SignUp.css';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

function Signup({ isOpen, close, loginHandler }) {
    const [img, setImg] = useState(null);
    const [signupInfo, setSignupInfo] = useState({
        profile_img: '',
        nickName: '',
        email: '',
        password: '',
        phoneNumber: '',
    });
    const [errorMessage, setErrorMessage] = useState(false);
    const history = useHistory();

    const fileEvent = async (e) => {
        setImg(e.target.files[0]);
        // const formData = new FormData();
        // formData.set('file', img);
        // const res = await axios.patch('/upload', formData);
        // return res;
        console.log('파일 업로드 완료.', e.target.files[0].name);
    };

    const inputHandler = (e) => {
        setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
    };

    const signUpRequestHandler = async () => {
        if (
            // !signupInfo.profile_img ||
            // !signupInfo.provider ||
            !signupInfo.nickName ||
            !signupInfo.email ||
            !signupInfo.password ||
            !signupInfo.phoneNumber
        ) {
            setErrorMessage(true);
            console.log(signupInfo);
        } else {
            console.log(signupInfo);
            await axios
                .post(
                    'http://localhost:80/signup',
                    {
                        profile_img: img.name,
                        nickName: signupInfo.nickName,
                        email: signupInfo.email,
                        password: signupInfo.password,
                        phoneNumber: signupInfo.phoneNumber,
                    },
                    { 'Content-Type': 'application/json', withCredentials: true },
                )
                .then((res) => {
                    console.log(res);
                    if (res.data.message === 'ok') {
                        alert('회원가입 완료');
                        return close();
                    }
                });
            const formData = new FormData();
            formData.append('file', img);
            await axios.patch('http://localhost:80/upload', formData);
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
                                <h1>Sign Up</h1>
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
                                    placeholder="picture"
                                    onChange={(e) => fileEvent(e)}
                                />
                                <button className="signUpB" onClick={signUpRequestHandler}>
                                    회원가입
                                </button>
                                <div className="loginLine">
                                    이미 아이디가 있으신가요?
                                    <Link to="/login">
                                        <button className="link" onClick={close}>
                                            로그인
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default Signup;
