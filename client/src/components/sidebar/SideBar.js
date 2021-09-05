import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarItem from './Sidebaritem';
import './SideBar.css';

function Sidebar() {
    const menus = [
        { name: '홈', path: '/' },
        { name: '회원가입', path: '/signup' },
        { name: '새 글 작성', path: '/content' },
        { name: '로그인', path: '/login' },
    ];
    const [isOpen, setisOpen] = useState(false);
    const sidebarHandler = () => {
        setisOpen(!isOpen);
    };
    return (
        <div className="sidebar">
            <div className="btn-menu">
                <a className="sidebarBtn" onClick={sidebarHandler}>
                    <svg width="18" height="12" viewBox="0 0 18 14" fill="none">
                        <rect width="18" height="2" fill="white"></rect>
                        <rect x="6" y="6" width="12" height="2" fill="white"></rect>
                        <rect y="12" width="18" height="2" fill="white"></rect>
                    </svg>
                </a>
            </div>
            {isOpen === true ? (
                <div className="sidebarBack" onClick={sidebarHandler}>
                    <div className="sidebarContents">
                        <button className="sidebarCloseBtn" onClick={sidebarHandler}>
                            X
                        </button>
                        {menus.map((menu, index) => {
                            return (
                                <Link to={menu.path} key={index}>
                                    <SidebarItem menu={menu} />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
export default Sidebar;
