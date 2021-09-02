import './Thumbnail.css';

import { Link } from 'react-router-dom';

function Thumbnail({ list, getContentDetail, writerId }) {
    return (
        <div>
            <div className="container">
                <h1 className="thumbTitle">{list.title}</h1>
                <div className="thumbPicContainer">
                    <img className="thumbPicture thumbPicture_1" src={`/upload/${list.picture_1}`}></img>
                </div>
                <div className="iconContainer">
                    <img
                        id="thumbVersus"
                        src="https://cdn.discordapp.com/attachments/881710985335934979/882719381036093461/vs_1.png"
                        alt="versus"></img>
                </div>
                <div className="thumbPicContainer">
                    <img className="thumbPicture thumbPicture_2" src={`/upload/${list.picture_2}`}></img>
                </div>
                <div className="descript">{list.description}</div>
            </div>
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
