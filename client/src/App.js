import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useParams, Link } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Thumbnail from './components/thumbnail/Thumbnail';
import axios from 'axios';
import SignupPage from './pages/signup/SignUpPage';
import CurContent from './pages/curcontent/CurContent';
import Mypage from './pages/mypage/Mypage';
import NewContent from './pages/newcontent/NewContent';
import LoginPage from './pages/login/LoginPage';

export default function App() {
    const [isLogin, setIsLogin] = useState();
    const [content, setContent] = useState({}); // 게시글 정보
    console.log(content);

    const loginHandler = function () {
        console.log('로그인됐다');
        setIsLogin(true);
    };

    const [contentList, setContentList] = useState([]);

    const getContentList = () => {
        axios.get('http://localhost:80/content').then((res) => {
            setContentList(res.data.content);
        });
    };

    const getContentDetail = (contentId) => {
        axios.get(`http://localhost:80/content/${contentId}`).then((res) => {
            console.log(res);
            setContent(res.data.data);
        });
    };

    useEffect(() => {
        getContentList();
    }, []);

    const [userInfo, setUserInfo] = useState([]);
    console.log(userInfo);

    function getUserInfo() {
        axios.post('http://localhost:80/user', { email: '확인중' }).then((res) => {
            setUserInfo(res.data.data);
        });
    }
    useEffect(() => {
        getUserInfo();
    }, []);
    console.log(localStorage);
    // useEffect(() => {
    //     localStorage.setItem('thetoopyo', userInfo.userInfo);
    // }, []);
    // console.log(localStorage);

    return (
        <BrowserRouter>
            <div className="app">
                <Nav
                    isLogin={isLogin}
                    loginHandler={loginHandler}
                    contentList={contentList}
                    getContentDetail={getContentDetail}></Nav>
                <div className="mainBanner">
                    <img
                        id="banner"
                        src="https://cdn.discordapp.com/attachments/881710985335934979/882192949079851008/2021-08-31_6.19.17.png"></img>
                </div>
                <Switch>
                    <Route path="/mypage">
                        <Mypage
                            onClick={getUserInfo}
                            userInfo={userInfo}
                            getUserInfo={getUserInfo}
                            contentList={contentList}
                            getContentDetail={getContentDetail}
                        />
                    </Route>
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/login">
                        <LoginPage loginHandler={loginHandler} />
                    </Route>
                    <Route path="/newContent" component={NewContent} />
                    <Route path="/curContent">
                        <CurContent content={content}></CurContent>
                    </Route>
                    <Route exact path="/">
                        <div className="app-thumb-entire">
                            {contentList.map((list) => {
                                return <Thumbnail list={list} key={list.id} getContentDetail={getContentDetail} />;
                            })}
                        </div>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}
