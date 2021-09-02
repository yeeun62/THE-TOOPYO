import '../../components/thumbnail/Thumbnail.css';
import './Mypage.css';
import { Link } from 'react-router-dom';

function MyThumbnail({ list }) {
    //{{`/update/${this.state.article.id}`} info={this.state.article}
    return (
        <div>
            <Link to={`/curContent/${list.id}`}>
                <div className="thumbBack">
                    <div className="myThumnailContainer">
                        <h1 className="thumbTitle">{list.title}</h1>
                        <img className="thumbPicture thumbPicture_1" src={`/upload/${list.picture_1}`}></img>
                        <img
                            id="thumbVersus"
                            src="https://cdn.discordapp.com/attachments/881710985335934979/881711027425787914/vs.png"
                            alt="versus"></img>
                        <img className="thumbPicture thumbPicture_2" src={`/upload/${list.picture_2}`}></img>
                        <div className="descript">{list.description}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default MyThumbnail;
