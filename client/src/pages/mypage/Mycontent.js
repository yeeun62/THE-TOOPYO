import axios from 'axios';
import React from 'react';
import MyThumbnail from './MyThumbnail';

export default function Mycontent({ MycontentList, userInfo }) {
    return (
        <>
            <h1>안녕하세요 {userInfo.nickName}</h1>
            <div>
                {MycontentList.map((list) => {
                    return (
                        <li>
                            <MyThumbnail list={list} key={list.id}></MyThumbnail>
                        </li>
                    );
                })}
            </div>
        </>
    );
}
