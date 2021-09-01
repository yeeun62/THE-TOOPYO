import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mypage.css';

export default function MypageDetail({ userInfo, getUserInfo }) {
    useEffect(() => {
        console.log('여기는 마이페이지디테일', userInfo);
    }, [userInfo]);

    const [isClick, setIsClick] = useState(false);
    const [patchInfo, setPatchInfo] = useState({
        // nickName: userInfo.nickName,
        // email: userInfo.email,
        // password: userInfo.password,
        // profile_img: userInfo.profile_img,
        // phoneNumber: userInfo.phoneNumber, // 초기값에 info.data.userInfo
    });
    console.log(userInfo);
    console.log(patchInfo);
    const clickHandler = () => {
        setIsClick(!isClick);
    };
    const fileEvent = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPatchInfo({ ...patchInfo, [e.target.name]: e.target.files });
            console.log('파일 업로드 완료.');
        };
        reader.readAsText(e.target.files[0]);
    };

    const inputHandler = (e) => {
        setPatchInfo({ ...patchInfo, [e.target.name]: e.target.value });
    };
    const patchRequestHandler = () => {
        if (!patchInfo.nickName || !patchInfo.password || !patchInfo.profile_img || !patchInfo.phoneNumber) {
            console.log('다 입력해주세요');
        } else {
            axios.patch(
                `http://localhost:80/user/${userInfo.id}`,
                {
                    nickName: patchInfo.nickName,
                    email: patchInfo.email,
                    password: patchInfo.password,
                    profile_img: patchInfo.profile_img,
                    phoneNumber: patchInfo.phoneNumber,
                },
                { 'Content-Type': 'application/json', withCredentials: true },
            );
        }
    };
    if (!userInfo) {
        return 'dㅇㅇㅇㅇ';
    }

    return (
        <>
            {isClick ? (
                <form onSubmit={(e) => e.preventDefault()}>
                    <h1 className="myHello">안녕하세요 {userInfo.nickName}님</h1>
                    <div className="myDetailContainer">
                        <div className="pfArea">
                            <a className="profile_img">
                                <div className="label">프로필 사진</div>
                                <input
                                    name="profile_img"
                                    className="avatar"
                                    type="file"
                                    onChange={(e) => fileEvent(e)}
                                />
                            </a>
                            <div className="infoContainer">
                                <div className="labelContainer">
                                    <div className="label">이메일</div>
                                    <div className="email">{userInfo.email}</div>
                                </div>
                                <div className="labelContainer">
                                    <div className="label">비밀번호</div>
                                    <input
                                        className="inputBox"
                                        name="password"
                                        type="password"
                                        placeholder="비밀번호를 입력해주세요"
                                        onChange={(e) => inputHandler(e)}
                                        value={patchInfo.password}></input>
                                </div>
                                <div className="labelContainer">
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
                                <div className="labelContainer">
                                    <div className="label">전화번호</div>
                                    <input
                                        className="inputBox"
                                        name="phoneNumber"
                                        type="text"
                                        maxLength="20"
                                        placeholder="전화번호를 입력해주세요"
                                        onChange={(e) => inputHandler(e)}
                                        value={patchInfo.phoneNumber}></input>
                                </div>
                                <input classname="editBtn" type="submit" value="저장" onClick={patchRequestHandler} />
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <>
                    <div className="myDetailContainer">
                        <h1 className="myHello">안녕하세요 {userInfo.nickName}님</h1>
                        <div className="pfArea">
                            <a className="profile_img">
                                <div className="label">프로필 사진</div>
                                <img src={userInfo.profile_img} name="profile_img" className="avatar" type="file" />
                            </a>
                            <div className="infoContainer">
                                <div className="labelContainer">
                                    <div className="label">이메일</div>
                                    <div className="user">{userInfo.email}</div>
                                </div>
                                <div className="labelContainer">
                                    <div className="label">닉네임</div>
                                    <div className="user">{userInfo.nickName}</div>
                                </div>
                                <div className="labelContainer">
                                    <div className="label">전화번호</div>
                                    <div className="user">{userInfo.phoneNumber}</div>
                                </div>
                                <button classname="editBtn" onClick={clickHandler}>
                                    수정
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
