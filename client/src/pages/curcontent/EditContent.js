import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import '../../pages/newcontent/NewContent.css';
axios.defaults.withCredentials = true;

function EditContent({ content, userInfo }) {
    const [information, setInformation] = useState({
        title: content.title,
        description: content.description,
        // picture_1: content.picture_1,
        // picture_2: content.picture_2,
        votingDeadLine: content.voting_deadline,
    });
    console.log(information);

    const [isErr, setIsErr] = useState(false);
    const isErrHandler = () => {
        setIsErr(isErr ? false : true);
    };

    const handleInputValue = (e) => {
        setInformation({ ...information, [e.target.name]: e.target.value });
    };

    const uploadHandler = async () => {
        if (information.title && information.description && information.voting_deadline) {
            console.log(information.title, information.description, information.voting_deadline);
            //|| !information.picture_1 || !information.picture_2
            // return isErrHandler();
            await axios.patch(
                `http://localhost:80/content:`,
                {
                    title: information.title,
                    // picture_1: information.picture_1,
                    // picture_2: information.picture_2,
                    description: information.description,
                },
                { 'Content-Type': 'application/json', withCredentials: true },
            );
        }
        // .then((res) => {
        //     if (res.message === 'please rewrite') return isErrHandler();
        //     else if (res.message === 'ok') {
        //         isOkHandler();
        //         return <CurContent id={res.data.content.id}></CurContent>;
        //     }
        // });
    };

    return (
        <div id="inner">
            <h1 id="newTitle">새 글 작성</h1>
            {/* {isErr ? (
                <div className="errMsg" onClick={setIsErr}>
                    모든 항목을 채워서 다시 입력해주세요.
                </div>
            ) : null} */}
            {/* {isOk ? <div>게시물 등록 완료</div> : null} */}
            <form action="" method="post">
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
export default EditContent;
