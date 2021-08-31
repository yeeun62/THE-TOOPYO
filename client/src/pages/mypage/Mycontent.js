import axios from 'axios';
import React from 'react';
import MyThumbnail from './MyThumbnail';

export default function Mycontent({ contentList, userInfo, idChange, getContentDetail }) {
    const filteredContents = contentList.filter((el) => {
        return el.nickName === userInfo.nickName;
    });
    console.log(filteredContents);

    return (
        <>
            <h1>안녕하세요 {userInfo.nickName}</h1>
            <div>
                {filteredContents.map((list) => {
                    return (
                        <li>
                            <MyThumbnail
                                list={list}
                                key={list.id}
                                idChange={idChange}
                                getContentDetail={getContentDetail}></MyThumbnail>
                        </li>
                    );
                })}
            </div>
        </>
    );
}
