import React, { useState, useEffect } from 'react';
import './Mypage.css';
import Tab from '../../components/tab/Tab';

export default function Mypage({ userInfo, MycontentList, setUserInfo }) {
    useEffect(() => {
        console.log('여기는 마이페이지', userInfo);
    });
    return (
        <div>
            <Tab setUserInfo={setUserInfo} userInfo={userInfo} MycontentList={MycontentList} />
        </div>
    );
}
