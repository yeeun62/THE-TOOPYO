import React from 'react';
import MyThumbnail from './MyThumbnail';

export default function Mycontent({ MycontentList, userInfo }) {
    return (
        <>
            <h1 className="myHello">안녕하세요 {userInfo.nickName}님 🎈</h1>
            <div className="filteredContainer">
                {MycontentList.map((list) => {
                    return (
                        <li className="mycontentContainer">
                            <MyThumbnail list={list} key={list.id}></MyThumbnail>
                        </li>
                    );
                })}
            </div>
        </>
    );
}
