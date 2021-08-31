import React, { useState, useEffect } from 'react';
import './Mypage.css';
import Tab from '../../components/tab/Tab';

export default function Mypage({ getUserInfo, userInfo, contentId, contentList, idChange, getContentDetail }) {
    console.log(userInfo);

    return (
        <div>
            <Tab
                userInfo={userInfo}
                getUserInfo={getUserInfo}
                id={contentId}
                contentList={contentList}
                idChange={idChange}
                getContentDetail={getContentDetail}
            />
        </div>
    );
}
