import './App.css';
import 'antd/dist/antd.css';
import { useState, useEffect } from 'react';
import { useHistory, BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Thumbnail from './components/thumbnail/Thumbnail';
import axios from 'axios';
import SignupPage from './pages/signup/SignUpPage';
import CurContent from './pages/curcontent/CurContent';
import Mypage from './pages/mypage/Mypage';
import NewContent from './pages/newcontent/NewContent';
import LoginPage from './pages/login/LoginPage';
import { Pagination } from 'antd';
import EditContent from './pages/curcontent/EditContent';
axios.defaults.withCredentials = true;

export default function App() {
    const history = useHistory();
    const [isLogin, setIsLogin] = useState();
    const [userInfo, setUserInfo] = useState({});
    const [MycontentList, setMyContentList] = useState([]);
    const [contentList, setContentList] = useState([]);
    const [currentPageList, setCurrentPageList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 6;

    const handleLogout = () => {
        axios.get('http://localhost:80/signout', {}).then((res) => {
            setUserInfo(null);
            setIsLogin(false);
            history.push('/');
        });
    };
    const handlePageChange = (page) => {
        if (contentList) {
            setCurrentPage(page);
            setCurrentPageList(contentList.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * page));
        }
    };

    useEffect(() => {
        if (contentList) {
            setCurrentPage(1);
            setCurrentPageList(contentList.slice(0, PAGE_SIZE));
        }
    }, [contentList]);
    const loginHandler = function () {
        setIsLogin(!isLogin);
    };

    const getContentList = () => {
        axios.get('http://localhost:80/content').then((res) => {
            setContentList(res.data.content);
        });
    };

    useEffect(() => {
        axios.get('http://localhost:80/user', { withCredentials: true }).then((res) => {
            setIsLogin(true);
            setUserInfo(res.data.data.userInfo);
            setMyContentList(res.data.data.content);
        });
    }, []);

    useEffect(() => {
        getContentList();
    }, []);

    // useEffect(() => {}, [userInfo]);

    return (
        <>
            <BrowserRouter>
                <div className="app">
                    <Nav
                        isLogin={isLogin}
                        loginHandler={loginHandler}
                        contentList={contentList}
                        handleLogout={handleLogout}></Nav>

                    <Switch>
                        <Route exact path="/">
                            <div id="entire">
                                <div className="app-thumb-entire">
                                    <div>
                                        <img
                                            id="banner"
                                            src="https://cdn.discordapp.com/attachments/881710985335934979/882192949079851008/2021-08-31_6.19.17.png"></img>
                                    </div>
                                    {currentPageList.map((list) => {
                                        return (
                                            <Link to={`/curContent/${list.id}`}>
                                                <Thumbnail list={list} key={list.id} />
                                            </Link>
                                        );
                                    })}
                                    <div className="Pagination">
                                        <Pagination
                                            defaultCurrent={1}
                                            current={currentPage}
                                            pageSize={PAGE_SIZE}
                                            onChange={handlePageChange}
                                            total={contentList.length}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Route>
                        <Route path="/editContent">
                            <EditContent></EditContent>
                        </Route>
                        <Route path="/mypage">
                            <Mypage userInfo={userInfo} MycontentList={MycontentList} setUserInfo={setUserInfo} />
                        </Route>
                        <Route path="/signup" component={SignupPage} />
                        <Route path="/login">
                            <LoginPage loginHandler={loginHandler} />
                        </Route>
                        <Route path="/newContent" component={NewContent} />
                        <Route path="/curContent/:id">
                            <CurContent userInfo={userInfo}></CurContent>
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </>
    );
}
