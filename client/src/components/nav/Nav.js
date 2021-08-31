import { useState } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import './Nav.css';
import LoginButton from '../modals/LoginBtn';
import SignUpButton from '../modals/SignUpBtn';
import Sidebar from '../sidebar/SideBar';
import SearchButton from '../search/SearchBtn';
import axios from 'axios';
import Mypage from '../../pages/mypage/Mypage';
import Tab from '../tab/Tab';

function Nav({ isLogin, loginHandler, contentList }) {
    const myPage = () => {
        axios.post('http://localhost:80/user', { email: '확인중' }).then((a) => {
            console.log(a);
        });
    };

    const [login, setLogin] = useState('로그인');

    return (
        <nav>
            <div className="navInner">
                <Sidebar />
                <Link to="/">
                    <div className="logoContainer">
                        <h1>
                            <img
                                className="logo"
                                src="https://cdn.discordapp.com/attachments/877171336508739646/881725307579674664/1.png"></img>
                        </h1>
                    </div>
                </Link>
                <div>
                    <ul className="buttonContainer">
                        <li>
                            <SearchButton contentList={contentList} />
                        </li>
                        <li>
                            <Link to="/NewContent">
                                <button className="newContentBtn navBtn">새 글 작성</button>
                            </Link>
                        </li>
                        <li>
                            <SignUpButton loginHandler={loginHandler} />
                        </li>
                        {isLogin ? (
                            <li>
                                <Link to="/mypage">
                                    <button className="navBtn" onClick={myPage}>
                                        my page
                                    </button>
                                </Link>
                            </li>
                        ) : (
                            <div>
                                <LoginButton loginHandler={loginHandler} />
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Nav;
