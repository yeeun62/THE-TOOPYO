import './Thumbnail.css';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CurContent from '../../pages/curcontent/CurContent';

function Thumbnail({ list, idChange, getContentDetail }) {
    const change = (id) => {
        idChange(id);
    };

    const contentDetail = () => {
        getContentDetail();
    };

    return (
        <div>
            <Link to="/curContent">
                <div
                    className="container"
                    onClick={() => {
                        change(list.id);
                        contentDetail();
                    }}>
                    <h1 className="thumbTitle">{list.title}title</h1>
                    <img className="picture_1" src={list.picture_1}></img>
                    <img
                        id="versus"
                        src="https://cdn.discordapp.com/attachments/881710985335934979/881711027425787914/vs.png"
                        alt="versus"></img>
                    <img className="picture_2" src={list.picture_2}></img>
                    <div className="descript">{list.description}</div>
                </div>
            </Link>
        </div>
    );
}

export default Thumbnail;

{
    /* <div id="inner">
    <div id="mainBanner"></div>
    <div className="app-thumb-entire">
        <div className="container">
            <h1 className="thumbTitle">title</h1>
            <div className="picture_1"></div>
            <span>vs</span>
            <div className="picture_2"></div>
            <div className="descript">
                alsxmdetjfdualkfdkfbvfbfbfgfa<br></br>lsxmdetjfdualkfdkfbvfbfbfgfalsxmdetjfdual
            </div>
        </div>
        <div className="container">
            <h1 className="thumbTitle">title</h1>
            <div className="picture_1"></div>
            <span>vs</span>
            <div className="picture_2"></div>
            <div className="descript">
                alsxmdetjfdualkfdkfbvfbfbfgfalsx<br></br>mdetjfdualkfdkfbvfbfbfgfalsxmdetjfdual
            </div>
        </div>
        <div className="container">
            <h1 className="thumbTitle">title</h1>
            <div className="picture_1"></div>
            <span>vs</span>
            <div className="picture_2"></div>
            <div className="descript">
                alsxmdetjfdualkfdkfbvfbfbfgfalsxmde<br></br>tjfdualkfdkfbvfbfbfgfalsxmdetjfdual
            </div>
        </div>
        <div className="container">
            <h1 className="thumbTitle">title</h1>
            <div className="picture_1"></div>
            <span>vs</span>
            <div className="picture_2"></div>
            <div className="descript">
                alsxmdetjfdualkfdkfbvfbfbfgfalsxmdet<br></br>jfdualkfdkfbvfbfbfgfalsxmdetjfdual
            </div>
        </div>
        <div className="container">
            <h1 className="thumbTitle">title</h1>
            <div className="picture_1"></div>
            <span>vs</span>
            <div className="picture_2"></div>
            <div className="descript">
                alsxmdetjfdualkfdkfbvfbfbfgfalsxmdetjfd<br></br>ualkfdkfbvfbfbfgfalsxmdetjfdual
            </div>
        </div>
        <div className="container">
            <h1 className="thumbTitle">title</h1>
            <div className="picture_1"></div>
            <span>vs</span>
            <div className="picture_2"></div>
            <div className="descript">
                alsxmdetjfdualkfdkfbvfbfbfg<br></br>falsxmdetjfdualkfdkfbvfbfbfgfalsxmdetjfdua
            </div>
        </div>
    </div>
</div>; */
}
