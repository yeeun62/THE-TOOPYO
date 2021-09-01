import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Search.css';
import SearchThumbnail from './SearchThumbnail';

export default function Search({ isOpen, close, contentList, getContentDetail }) {
    // 컨텐츠리스트를 데이터로 받아서 그걸 필터하고 맵걸어서 썸네일에 그 값을 넣어 출력하는 함수
    // 저기에 리스트를 넣는게 맞는지 모르겠으나 앱 JS를 보고 일단 만듬.

    const [searchKeyword, SetSearchKeyword] = useState('');
    const inputHandler = (e) => {
        SetSearchKeyword(([e.target.name] = e.target.value));
    };
    const filteredContent = (data) => {
        console.log(data);
        data = data.filter((el) => {
            return el.title.indexOf(searchKeyword) > -1;
        });
        return data.map((list) => {
            return (
                <li>
                    <Link
                        to={{
                            pathname: `/curContent/${list.id}`,
                        }}>
                        <SearchThumbnail close={close} list={list} key={list.id} />
                    </Link>
                </li>
            );
        });
    };
    console.log(filteredContent(contentList));
    return (
        <>
            {isOpen ? (
                <div className="searchModal">
                    <div className="inputWrapper">
                        <svg width="4vw" height="4vw" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M12.3243 4.98201C14.3159 6.97369 14.3159 10.2028 12.3243 12.1945C10.3326 14.1862 7.10345 14.1862 5.11177 12.1945C3.1201 10.2028 3.1201 6.97369 5.11177 4.98201C7.10345 2.99034 10.3326 2.99034 12.3243 4.98201ZM14.8612 12.8929C16.9167 9.96687 16.6367 5.90038 14.0213 3.28496C11.0924 0.356024 6.34365 0.356024 3.41472 3.28496C0.485785 6.21389 0.485785 10.9626 3.41472 13.8916C6.07942 16.5563 10.2504 16.7967 13.1869 14.6127L17.8336 19.2595C18.3022 19.7281 19.062 19.7281 19.5307 19.2595C19.9993 18.7908 19.9993 18.031 19.5307 17.5624L14.8612 12.8929Z"
                                fill="#ccc"></path>
                        </svg>
                        <input
                            className="searchInput"
                            placeholder="검색하기"
                            name="searchKeyword"
                            onChange={inputHandler}
                            value={searchKeyword}></input>
                        <button className="closeBtn" onClick={close}>
                            X
                        </button>
                    </div>
                    <div className="searchThumbnail">
                        {filteredContent(contentList).length !== 0 ? (
                            <div className="filteredContainer">{filteredContent(contentList)}</div>
                        ) : (
                            '검색 결과가 없습니다.'
                        )}
                    </div>
                </div>
            ) : null}
        </>
    );
}
