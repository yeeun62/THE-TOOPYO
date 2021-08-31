import React, { useState, useEffect } from 'react';
import './Mypage.css';
import Tab from '../../components/tab/Tab';

export default function Mypage({ getUserInfo, userInfo }) {
    console.log(userInfo);
  
    return (
        <div>
            <Tab userInfo={userInfo} getUserInfo={getUserInfo} />
        </div>
    );
}