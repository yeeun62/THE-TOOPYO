import '../../components/thumbnail/Thumbnail.css';
import './Search.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function SearchThumbnail({ list, close }) {
    return (
        <div>
            <div
                className="searchThumbContainer"
                onClick={() => {
                    close();
                }}>
                <h1 className="thumbTitle">{list.title}</h1>
                <img className="thumbPicture thumbPicture_1" src={list.picture_1}></img>
                <div className="iconContainer">
                    <img
                        id="thumbVersus"
                        src="https://cdn.discordapp.com/attachments/881710985335934979/881711027425787914/vs.png"
                        alt="versus"></img>
                </div>
                <img className="thumbPicture thumbPicture_2" src={list.picture_2}></img>
                <div className="descript">{list.description}</div>
            </div>
        </div>
    );
}

export default SearchThumbnail;
