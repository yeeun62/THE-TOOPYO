import axios from 'axios';
import React from 'react';
import MyThumbnail from './MyThumbnail';

export default function Mycontent({ contentList, userInfo, getContentDetail }) {
    const filteredContents = contentList.filter((el) => {
        return el.nickName === userInfo.nickName;
    });
    console.log(filteredContents);

    return (
        <>
            <h1 className="mypageTitle">안녕하세요 {userInfo.nickName}님</h1>
            <div>
                <div className="filteredContainer">
                    {filteredContents.map((list) => {
                        return (
                            <li className="mycontentContainer">
                                <MyThumbnail
                                    list={list}
                                    key={list.id}
                                    getContentDetail={getContentDetail}></MyThumbnail>
                            </li>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
