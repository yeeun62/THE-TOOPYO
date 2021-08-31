import { useState } from 'react';
import axios from 'axios';
import './CurContent.css';

function CurContent({ content, id }) {
    const [isAuthOk, setIsAuthOk] = useState(false); // session id 를 보내고 인증이 완료되어 투표한 경우
    const [isAuthNot, setIsAuthNot] = useState(false);

    const isAuthOkHandler = () => {
        setIsAuthOk(true);
    };

    const isAuthNotHandler = () => {
        setIsAuthNot(false);
    };

    const getAgree = () => {
        console.log('agree실행됨');
        axios.get(`https://localhost:80/content/agree/${id}`).then((res) => {
            if (res.message === 'agree complete') return isAuthOkHandler();
            else {
                return isAuthNotHandler();
            }
        });
    };

    const getDisagree = () => {
        axios.get(`https://localhost:80/content/disagree/${id}`).then((res) => {
            if (res.message === 'disagree complete') return isAuthOkHandler();
            else {
                return isAuthNotHandler();
            }
        });
    };

    const deleteContent = () => {
        axios.delete(`https://localhost:80/content/${id}`).then((res) => {
            if (res.message === 'delete complete') {
                isAuthOkHandler();
            } else {
                isAuthNotHandler();
            }
        });
    };

    return (
        <div className="curContent">
            <div className="curCotainerTitle">
                <h1 id="curTitle">{content.title}</h1>
                <button className="editContentBtn curBtn">
                    <img
                        id="editContent"
                        src="https://cdn.discordapp.com/attachments/881710985335934979/881927360398655518/edit.png"></img>
                </button>
                <button className="deleteContentBtn curBtn" onClick={deleteContent}>
                    <img
                        id="deleteContent"
                        src="https://cdn.discordapp.com/attachments/837593576955052072/881931904486621204/delete.png"></img>
                </button>
            </div>
            {/* 버튼 끝!!!!!!!!!!!!!!!!             @@@@@@@@@@@@@@@@@ */}
            <div className="contentMain">
                <div className="contentInner">
                    {isAuthOk ? (
                        <div className="alert authOk">
                            <button onClick={isAuthOkHandler} className="checkAlertBtn">
                                확인
                            </button>
                            요청이 완료되었습니다.
                        </div>
                    ) : null}

                    {isAuthNot ? (
                        <div className="alert authNot" onClick={isAuthNotHandler}>
                            <button onClick={isAuthOkHandler} className="checkAlert">
                                확인
                            </button>
                            로그인이 필요한 서비스입니다.
                        </div>
                    ) : null}
                    {/* 알러트창!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!알러트창~!!!!!!!!!!!!! */}
                    <ul id="curPicContainer">
                        <li>
                            <div className="curPic">
                                <img
                                    src={content.picture_1}
                                    alt={content.description}
                                    className="curPicture_1 curPic"
                                    onClick={getAgree}></img>
                            </div>
                        </li>
                        <li className="curVersus">
                            <img src="https://cdn.discordapp.com/attachments/881710985335934979/881711027425787914/vs.png"></img>
                        </li>
                        <li>
                            <div className="curPic">
                                <img
                                    src={content.picture_2}
                                    alt={content.description}
                                    className="curPicture_2 curPic"
                                    onClick={getDisagree}></img>
                            </div>
                        </li>
                    </ul>
                    {/* ---------------------작성자프로필-------------------- */}
                    <div className="contentInfo">
                        <div className="curWriter">
                            <div className="curWriterImg">
                                <img
                                    src={content.profile_img}
                                    // alt="작성자 프로필 사진"
                                    className="curWriterProfile"></img>
                            </div>
                            <span className="curWriterName">{content.nickname}</span>
                        </div>
                        <span className="curDesc">{content.description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurContent;
