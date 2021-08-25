import './App.css';
import { useReducer, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Thumbnail from './components/Thumbnail';
import axios from 'axios';

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const loginHandler = function () {
        setIsLogin(true);
    };

    const [contentList, setContentList] = useState([]);

    const getContentList = () => {
        axios.get('https://localhost:4000/content').then((res) => {
            setContentList(res.data.content);
        });
    };

    getContentList();

    return (
        <div>
            <Nav isLogin={isLogin} loginHandler={loginHandler}></Nav>
            <img className="main_banner" src="" alt=""></img>
            <div>
                <ul>
                    {contentList.map((list) => {
                        <Route path="/CurContent">
                            <Thumbnail list={list}></Thumbnail>
                        </Route>;
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
