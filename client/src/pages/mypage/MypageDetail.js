import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mypage.css';
import { useHistory } from 'react-router-dom';

export default function MypageDetail({ userInfo, setUserInfo }) {
    useEffect(() => {
        console.log('여기는 마이페이지디테일', userInfo);
    }, [userInfo]);
    const history = useHistory();
    const [img, setImg] = useState(null);
    const [isClick, setIsClick] = useState(false);
    const [patchInfo, setPatchInfo] = useState(userInfo);
    console.log(userInfo);
    console.log(patchInfo);
    const clickHandler = () => {
        setIsClick(!isClick);
    };
    const fileEvent = async (e) => {
        setImg(e.target.files[0]);
        // const formData = new FormData();
        // formData.set('file', img);
        // const res = await axios.patch('/upload', formData);
        // return res;
        console.log('파일 업로드 완료.', e.target.files[0].name);
    };

    const inputHandler = (e) => {
        setPatchInfo({ ...patchInfo, [e.target.name]: e.target.value });
    };

    const patchRequestHandler = async () => {
        let image;
        if (img) {
            image = img.name;
        } else {
            image = userInfo.profile_img;
        }
        if (patchInfo.nickName && patchInfo.password && patchInfo.phoneNumber && userInfo.email) {
            await axios
                .patch(`http://localhost:80/user`, {
                    nickName: patchInfo.nickName,
                    email: userInfo.email,
                    password: patchInfo.password,
                    profile_img: image,
                    phoneNumber: patchInfo.phoneNumber,
                })
                .then((res) => {
                    setUserInfo({
                        ...userInfo,
                        nickName: patchInfo.nickName,
                        email: userInfo.email,
                        password: patchInfo.password,
                        profile_img: image,
                        phoneNumber: patchInfo.phoneNumber,
                    });
                    console.log(res);
                    history.push('/mypage');
                });
            const formData = new FormData();
            formData.append('file', img);
            await axios.patch('http://localhost:80/upload', formData);
        }
    };

    return (
        <>
            {isClick ? (
                <form onSubmit={(e) => e.preventDefault()}>
                    <h1 className="myHello">안녕하세요 {userInfo.nickName}님 🎈</h1>
                    <div className="myDetailContainer">
                        <div className="pfAreaContainer">
                            <div className="pfArea">
                                <div className="label">프로필 사진</div>
                                <div className="profile">
                                    <div className="circle">
                                        <img
                                            src={`/upload/${userInfo.profile_img}`}
                                            alt={userInfo.nickName}
                                            name="profile_img"
                                            className="avatar"
                                            type="file"></img>
                                    </div>
                                    <div className="actions">
                                        <button className="editBtncon" type="submit" onClick={patchRequestHandler}>
                                            저장
                                        </button>
                                    </div>
                                    <input
                                        name="profile_img"
                                        className="imgInputBtn"
                                        type="file"
                                        onChange={fileEvent}
                                    />
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div id="mypageDetailContainer">
                    <h1 className="myHello">안녕하세요 {userInfo.nickName}님 🎈</h1>
                    <div className="myDetailContainer">
                        <div className="pfAreaContainer">
                            <div className="pfArea">
                                <div className="label">프로필</div>
                                <div className="profile">
                                    <div className="circle">
                                        <img
                                            src={`/upload/${userInfo.profile_img}`}
                                            alt={userInfo.nickName}
                                            name="profile_img"
                                            className="avatar"
                                            type="file"></img>
                                    </div>
                                    <div className="actions">
                                        <button className="editBtncon" onClick={clickHandler}>
                                            수정
                                        </button>
                                    </div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
