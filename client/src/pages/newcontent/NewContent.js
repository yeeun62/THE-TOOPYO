import axios from 'axios';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './NewContent.css';
import CurContent from '../curcontent/CurContent';
axios.defaults.withCredentials = true;

function NewContent() {
    const history = useHistory();
    const [information, setInformation] = useState({
        title: '',
        description: '',
        // picture_1: '',
        // picture_2: '',
        votingDeadLine: 'false',
    });
    console.log(information);

    const [isOk, setIsOk] = useState(false);

    const isOkHandler = () => {
        setIsOk(isOk ? false : true);
    };

    const [isErr, setIsErr] = useState(false);
    const isErrHandler = () => {
        setIsErr(isErr ? false : true);
    };

    const handleInputValue = (e) => {
        setInformation({ ...information, [e.target.name]: e.target.value });
    };

    const handleInputfile = (e) => {
        setInformation({ ...information, [e.target.name]: e.target.file });
    };

    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);

    const fileEvent1 = async (e) => {
        setImg1(e.target.files[0]);
        // const formData = new FormData();
        // formData.set('file', img);
        // const res = await axios.patch('/upload', formData);
        // return res;
        console.log('파일 업로드 완료.', e.target.files[0].name);
    };

    const fileEvent2 = async (e) => {
        setImg2(e.target.files[0]);
        // const formData = new FormData();
        // formData.set('file', img);
        // const res = await axios.patch('/upload', formData);
        // return res;
        console.log('파일 업로드 완료.', e.target.files[0].name);
    };

    const uploadHandler = async () => {
        console.log('up');
        if (information.title && information.description) {
            console.log(information.title, information.description, information.votingDeadLine);
            //|| !information.picture_1 || !information.picture_2
            // return isErrHandler();
            await axios
                .post(
                    'http://localhost:80/content',
                    {
                        title: information.title,
                        picture_1: img1.name,
                        picture_2: img2.name,
                        description: information.description,
                        voting_deadline: information.votingDeadLine,
                    },
                    { 'Content-Type': 'application/json', withCredentials: true },
                )
                .then((res) => {
                    const formData = new FormData();
                    formData.append('file', img1);
                    formData.append('file', img2);
                    axios.patch('http://localhost:80/uploads', formData);

                    if (res.data.message === 'please rewrite') return isErrHandler();
                    else if (res.data.message === 'ok') {
                        isOkHandler();
                        window.location.replace(`/curContent/${res.data.contentId}`);
                    }
                });
        }
    };

    return (
        <div id="inner">
            <h1 id="newTitle">새 글 작성</h1>
            {isErr ? (
                <div className="errMsg" onClick={setIsErr}>
                    모든 항목을 채워서 다시 입력해주세요.
                </div>
            ) : null}
            {isOk ? <div>게시물 등록 완료</div> : null}
            <form onSubmit={(e) => e.preventDefault()}>
                {/*action="데이터보낼 서버의 파일"*/}
                <input
                    className="inputTitle"
                    type="text"
                    maxLength="20"
                    autoFocus
                    required
                    placeholder="제목을 입력하세요"
                    name="title"
                    onChange={(e) => handleInputValue(e)}></input>
                <button onClick={uploadHandler} id="NewSubmit" />
                {/* --------------------- 상단 제목과 버튼 부분 ----------------- */}
                <div className="NewContentFrame">
                    <div className="pic Left">
                        <img className="picBg"></img>
                        <input
                            id="pic_1"
                            type="file"
                            accept="image/png, image/jpeg"
                            name="picture_1"
                            onChange={fileEvent1}
                            // onChange={(e) => handleInputfile(e)}
                        ></input>
                    </div>
                    <img
                        id="newVersus"
                        src="https://cdn.discordapp.com/attachments/881710985335934979/881711027425787914/vs.png"></img>
                    <div className="pic Right">
                        <img className="picBg" src=""></img>
                        <input
                            id="pic_2"
                            type="file"
                            accept="image/png, image/jpeg"
                            name="picture_2"
                            onChange={fileEvent2}
                            // onChange={(e) => handleInputfile(e)}
                        ></input>
                    </div>
                    <input
                        className="NewDesc"
                        type="text"
                        required
                        placeholder="설명을 입력해주세요."
                        name="description"
                        onChange={(e) => handleInputValue(e)}></input>
                </div>
            </form>
        </div>
    );
}

export default NewContent;
