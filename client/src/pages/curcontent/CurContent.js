import { useState, useEffect } from 'react';
import axios from 'axios';
import './CurContent.css';
import { useParams } from 'react-router-dom';

function CurContent({ userInfo }) {
    let { id } = useParams();
    const [content, setContent] = useState({});
    const [isAuthOk, setIsAuthOk] = useState(false); // session id 를 보내고 인증이 완료되어 투표한 경우
    const [isAuthNot, setIsAuthNot] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:80/content/${id}`).then((res) => {
            console.log('res', res);
            setContent(res.data.data);
        });
    }, []);

    const isAuthOkHandler = () => {
        setIsAuthOk(true);
    };

    const isAuthNotHandler = () => {
        setIsAuthNot(false);
    };

    const getAgree = () => {
        axios.get(`http://localhost:80/content/agree/${id}`).then((res) => {
            axios.get(`http://localhost:80/content/${id}`).then((res) => {
                setContent(res.data.data);
            });
            if (res.data.message === 'agree complete') {
                return isAuthOkHandler();
            } else {
                return isAuthNotHandler();
            }
        });
    };

    const getDisagree = () => {
        axios.get(`http://localhost:80/content/disagree/${id}`).then((res) => {
            axios.get(`http://localhost:80/content/${id}`).then((res) => {
                setContent(res.data.data);
            });
            if (res.data.message === 'disagree complete') {
                return isAuthOkHandler();
            } else {
                return isAuthNotHandler();
            }
        });
    };

    const deleteContent = () => {
        axios.delete(`http://localhost:80/content/${id}`).then((res) => {
            if (res.message === 'delete complete') {
                isAuthOkHandler();
            } else {
                isAuthNotHandler();
            }
        });
    };

    const requestDeadline = () => {
        axios.get('http://localhost:80/content').then((res) => {
            console.log(res);
            alert('css 모달만들어주세요');
        });
    };

    return (
        <div className="curContent">
            <div className="curCotainerTitle">
                <h1 id="curTitle">{content.title}</h1>
                {content.userId === userInfo.id ? (
                    <>
                        {content.voting_deadline ? null : (
                            <button className="editContentBtn voting" onClick={requestDeadline}>
                                투표종료
                            </button>
                        )}

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
                    </>
                ) : null}
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

                    {content.voting_deadline ? (
                        <div className="voteOver">투표가 종료된 게시물입니다.</div>
                    ) : (
                        <div className="voteIng">투표중입니다.</div>
                    )}
                    <ul id="curPicContainer">
                        <li>
                            <div className="curPic" onClick={getAgree}>
                                <img
                                    src={`/upload/${content.picture_1}`}
                                    alt={content.description}
                                    className="curPicture_1 curPic"></img>
                            </div>
                            <div className={content.checkAgree ? 'over' : 'ing'}>찬성{content.agree}</div>
                        </li>
                        <li className="curVersus">
                            <img src="https://cdn.discordapp.com/attachments/881710985335934979/881711027425787914/vs.png"></img>
                        </li>
                        <li>
                            <div className="curPic" onClick={getDisagree}>
                                <img
                                    src={`/upload/${content.picture_2}`}
                                    alt={content.description}
                                    className="curPicture_2 curPic"></img>
                            </div>
                            <div className={content.checkAgree ? 'over' : 'ing'}>반대{content.disagree}</div>
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
                            <span className="curWriterName">닉네임{content.nickname}</span>
                        </div>
                        <span className="curDesc">{content.description}</span>
                    </div>
                    <div className="footer"></div>
                </div>
            </div>
        </div>
    );
}

export default CurContent;
