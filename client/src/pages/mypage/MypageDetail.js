import React, { useState } from 'react';
import axios from 'axios';
import './Mypage.css';

export default function MypageDetail(props) {
    const info = props.data.userInfo;
    const [isClick, setIsClick] = useState(false);
    const [patchInfo, setPatchInfo] = useState({
        nickName: '',
        email: '',
        password: '',
        profile_img: '',
        phone: '', // 초기값에 info.data.userInfo
    });
    const clickHandler = () => {
        setIsClick(!isClick);
    };
    const fileEvent = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPatchInfo({ ...patchInfo, [e.target.name]: e.target.picture });
            console.log('파일 업로드 완료.');
        };
        reader.readAsText(e.target.files[0]);
    };
    const inputHandler = (e) => {
        setPatchInfo({ ...patchInfo, [e.target.name]: e.target.value });
    };
    const patchRequestHandler = () => {
        if (
            !patchInfo.nickname ||
            !patchInfo.email ||
            !patchInfo.password ||
            !patchInfo.profile_img ||
            !patchInfo.phone
        ) {
        } else {
            axios.patch(
                'https://localhost:4000/user/:id',
                {
                    nickName: patchInfo.nickName,
                    email: patchInfo.email,
                    password: patchInfo.password,
                    profile_img: patchInfo.profile_img,
                    phone: patchInfo.phone,
                },
                { 'Content-Type': 'application/json', withCredentials: true },
            ); // 또 뭐 담아야하징 헤더 auth?
        }
    };

    return (
        <>
            {isClick ? (
                <form>
                    <h1>안녕하세요 info.name님</h1>
                    <div className="pf-input-area">
                        <a className="profile_img">
                            <div className="label">프로필 사진</div>
                            <input
                                name="profile_img"
                                type="file"
                                className="avatar"
                                onChange={(e) => fileEvent(e)}
                                value={patchInfo.profile_img}></input>
                        </a>
                        <div className="id">
                            <div className="label">아이디</div>
                            <div>info.id</div>
                        </div>
                        <div className="password">
                            <div className="label">비밀번호</div>
                            <input
                                className="inputBox"
                                name="password"
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                onChange={(e) => inputHandler(e)}
                                value={patchInfo.password}></input>
                        </div>
                        <div className="nickName">
                            <div className="label">닉네임</div>
                            <input
                                className="inputBox"
                                name="nickName"
                                type="text"
                                maxLength="20"
                                placeholder="닉네임을 입력해주세요"
                                onChange={(e) => inputHandler(e)}
                                value={patchInfo.nickName}></input>
                        </div>
                        <div className="email">
                            <div className="label">이메일</div>
                            <input
                                className="inputBox"
                                name="email"
                                type="text"
                                maxLength="20"
                                placeholder="이메일을 입력해주세요"
                                onChange={(e) => inputHandler(e)}
                                value={patchInfo.email}></input>
                        </div>
                        <div className="phone">
                            <div className="label">전화번호</div>
                            <input
                                className="inputBox"
                                name="phone"
                                type="text"
                                maxLength="20"
                                placeholder="전화번호를 입력해주세요"
                                onChange={(e) => inputHandler(e)}
                                value={patchInfo.phone}></input>
                        </div>
                        <input type="submit" value="저장" onClick={patchRequestHandler} />
                    </div>
                </form>
            ) : (
                <div>
                    <h1>안녕하세요 info.nickName님</h1>
                    <div className="pfArea">
                        <a className="pfImg">
                            <div className="label">프로필 사진</div>
                            <div type="file" className="avatar">
                                이미지
                            </div>
                        </a>
                        <div className="id">
                            <div className="label">아이디</div>
                            <div className="id">info.id</div>
                        </div>
                        <div className="nickName">
                            <div className="label">닉네임</div>
                            <div>info.nickName</div>
                        </div>
                        <div className="email">
                            <div className="label">이메일</div>
                            <div>info.email</div>
                        </div>
                        <div className="phone">
                            <div className="label">전화번호</div>
                            <div>info.phone</div>
                        </div>
                    </div>
                    <button classname="editBtn" onClick={clickHandler}>
                        수정
                    </button>
                </div>
            )}
        </>
    );
}
