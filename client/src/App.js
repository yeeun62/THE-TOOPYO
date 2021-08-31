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
axios.defaults.withCredentials = true;

export default function App() {
    const [isLogin, setIsLogin] = useState();
    const [content, setContent] = useState({}); // 게시글 정보
    const [userInfo, setUserInfo] = useState({});
    const [MycontentList, setMyContentList] = useState([]);
    const [contentList, setContentList] = useState([]);

    const loginHandler = function () {
        setIsLogin(!isLogin);
    };

    const getContentList = () => {
        axios.get('http://localhost:80/content').then((res) => {
            setContentList(res.data.content);
        });
    };

    // function getUserInfo() {
    //     axios.get('http://localhost:80/user').then((res) => {
    //         console.log(res);
    //         setIsLogin(true);
    //         setUserInfo(res.data.data);
    //     });
    // }

    useEffect(() => {
        axios.get('http://localhost:80/user', { withCredentials: true }).then((res) => {
            console.log('어쩔숟없어', res);
            setIsLogin(true);
            setUserInfo(res.data.data.userInfo);
            setMyContentList(res.data.data.content);
        });
    }, []);

    const getContentDetail = (contentId) => {
        axios.get(`http://localhost:80/content/${contentId}`).then((res) => {
            console.log(res);
            setContent(res.data.data);
        });
    };

    useEffect(() => {
        getContentList();
    }, []);

    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);

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

                <Switch>
                    <Route path="/mypage">
                        <Mypage userInfo={userInfo} MycontentList={MycontentList} />
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
                        <div className="mainBanner">
                            <img
                                id="banner"
                                src="https://cdn.discordapp.com/attachments/881710985335934979/882192949079851008/2021-08-31_6.19.17.png"></img>
                        </div>
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
