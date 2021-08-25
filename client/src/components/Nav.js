import { useState } from 'react';
import './Nav.css';

function Nav(isLogin) {
    return (
        <nav>
            <div className="nav_inner">
                <div className="logo_container">
                    {/* <Route exact path="/">
                        <img className="logo" src=""></img>
                    </Route> */}
                    <div id="logo"></div>
                </div>
                <div>
                    <ul className="button_container">
                        <li>
                            <button>
                                <img src="./searchIcon.png"></img>
                            </button>
                        </li>
                        <li>
                            <button className="new_Content_Btn">새 글 작성</button>
                        </li>
                        {isLogin ? (
                            <li>
                                <button>my page</button>
                            </li>
                        ) : (
                            <li>
                                <button>login</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Nav;
