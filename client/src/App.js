import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Thumbnail from './components/thumbnail/Thumbnail';
import axios from 'axios';
import SignupPage from './pages/signup/SignUpPage';
import CurContent from './pages/curcontent/CurContent';
import Mypage from './pages/mypage/Mypage';
import NewContent from './pages/newcontent/NewContent';

export default function App() {
    const [isLogin, setIsLogin] = useState();

    const [content, setContent] = useState({}); // 게시글 정보

    const loginHandler = function () {
        setIsLogin(true);
    };

    const [contentList, setContentList] = useState([]);

    const getContentList = () => {
        axios.get('http://localhost:80/content').then((res) => {
            setContentList(res.data.content);
        });
    };
    const [contentId, setContentId] = useState();

    const idChange = (change) => {
        setContentId(change);
    };

    const getContentDetail = (contentId) => {
        setContentId(contentId);
        axios.get(`http://localhost:80/content/${contentId}`).then((res) => {
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

    // useEffect(() => {
    //     localStorage.setItem('thetoopyo', userInfo.userInfo);
    // }, []);
    // console.log(localStorage);

    return (
        <BrowserRouter>
            <div className="app">
                <Nav isLogin={isLogin} loginHandler={loginHandler} contentList={contentList}></Nav>
                <img className="mainBanner" src="" alt=""></img>

                <Switch>
                    <Route path="/mypage">
                        <Mypage onClick={getUserInfo} userInfo={userInfo} getUserInfo={getUserInfo} />
                    </Route>
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/newContent" component={NewContent} />
                    <Route path="/curContent">
                        <CurContent content={content}></CurContent>
                    </Route>
                    <Route exact path="/">
                        <div className="app-thumb-entire">
                            {contentList.map((list) => {
                                return (
                                    <Thumbnail
                                        list={list}
                                        key={list.id}
                                        id={contentId}
                                        getContentDetail={getContentDetail}
                                    />
                                );
                            })}
                            {/* <div ref={observer} />
                            <>
                                {isLoading && (
                                    <Thumbnail
                                        list={list}
                                        key={list.id}
                                        id={contentId}
                                        getContentDetail={getContentDetail}
                                    />
                                )}
                            </> */}
                        </div>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}
