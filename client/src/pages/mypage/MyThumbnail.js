import '../../components/thumbnail/Thumbnail.css';

import { Link } from 'react-router-dom';

function MyThumbnail({ list, getContentDetail }) {
    const contentDetail = () => {
        getContentDetail(list.id);
    };

    return (
        <div>
            <Link to="/curContent">
                <div
                    className="container"
                    onClick={() => {
                        contentDetail();
                    }}>
                    <h1 className="thumbTitle">{list.title}</h1>
                    <img className="thumbPicture thumbPicture_1" src={list.picture_1}></img>
                    <img
                        id="thumbVersus"
                        src="https://cdn.discordapp.com/attachments/881710985335934979/881711027425787914/vs.png"
                        alt="versus"></img>
                    <img className="thumbPicture thumbPicture_2" src={list.picture_2}></img>
                    <div className="descript">{list.description}</div>
                </div>
            </Link>
        </div>
    );
}

export default MyThumbnail;
