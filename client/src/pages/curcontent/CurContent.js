import { useState, useEffect } from 'react';
import axios from 'axios';
import './CurContent.css';
import { useParams } from 'react-router-dom';
import NewContent from '../newcontent/NewContent';

function CurContent({ userInfo }) {
    let { id } = useParams();
    const [content, setContent] = useState({});
    const [isOk, setIsAuthOk] = useState(false); // session id 를 보내고 인증이 완료되어 투표한 경우
    const [isAuthNot, setIsAuthNot] = useState(false);
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [votingdead, setVotingdead] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:80/content/${id}`).then((res) => {
            //console.log('res', res);
            setContent(res.data.data);
            if (res.data.data.voting_deadline === 'true') {
                setVotingdead(true);
            }
        });
    }, []);

    const isAuthOkHandler = () => {
        setIsAuthOk(!isOk);
    };

    const isAuthNotHandler = () => {
        setIsAuthNot(!isAuthNot);
    };

    const modalhandler = () => {
        setModal(!modal);
    };
    const getAgree = () => {
        axios.get(`http://localhost:80/content/agree/${id}`).then((res) => {
            axios.get(`http://localhost:80/content/${id}`).then((res) => {
                setContent(res.data.data);
            });
            if (res.data.message === 'agree complete') {
                return modalhandler();
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
                console.log(res.data);
                return modalhandler();
            } else {
                return isAuthNotHandler();
            }
        });
    };

    const editContent = () => {
        console.log('수정됩니가');
        setIsEdit(false);
    };

    const deleteContent = () => {
        console.log('딜리트됩니까');
        axios.delete(`http://localhost:80/content/${id}`).then((res) => {
            if (res.data.message === 'delete complete') {
                // isAuthOkHandler();
                alert('삭제가 완료되었습니다.');
                window.location.replace('/');
            } else {
                isAuthNotHandler();
            }
        });
    };

    const requestDeadline = () => {
        axios.patch(`http://localhost:80/content/deadline/${content.id}`).then((res) => {
            console.log(res);
            alert('투표가 종료되었습니다.');
            window.location.replace(`/curContent/${id}`);
        });
    };

    return (
        <div className="curContent">
            {isEdit ? (
                <>
                    <div className="curCotainerTitle">
                        <h1 id="curTitle">{content.title}</h1>
                        {content.userId === userInfo.id ? (
                            <>
                                {votingdead ? null : (
                                    <button className="editContentBtn voting curBtn" onClick={requestDeadline}>
                                        <img
                                            id="votingDeadline"
                                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMCA1MTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaWQ9IlhNTElEXzE5NDZfIj48cGF0aCBpZD0iWE1MSURfMTk0N18iIGQ9Im0yMzIgMzQ3LjQzNCAzMS4wMzggNzIuNTY2aDI4Ljk2MnYtMTUwaC0zMHY3MS4zNzhsLTI5LjUzOC03MS4zNzhoLTMwLjQ2MnYxNTBoMzB6IiBmaWxsPSIjMDYwYTdkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggaWQ9IlhNTElEXzIzNzBfIiBkPSJtNDEyIDM3NXYtNjBjMC0yNC44MTQtMTkuNjg2LTQ1LTQ0LjUtNDVoLTQ1LjV2MTUwaDQ1LjVjMjQuODE0IDAgNDQuNS0yMC4xODYgNDQuNS00NXptLTYwLTc1aDE1LjVjOC4yNzIgMCAxNC41IDYuNzI4IDE0LjUgMTV2NjBjMCA4LjI3Mi02LjIyOCAxNS0xNC41IDE1aC0xNS41eiIgZmlsbD0iIzA2MGE3ZCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjxwYXRoIGlkPSJYTUxJRF8yMzcxXyIgZD0ibTE3MiAzOTBoLTQ1di0zMGgzMHYtMzBoLTMwdi0zMGg0NXYtMzBoLTc1djE1MGg3NXoiIGZpbGw9IiMwNjBhN2QiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48cGF0aCBpZD0iWE1MSURfMjM3Ml8iIGQ9Im00MTIgMjEwaC00NXYtMzBoMzB2LTMwaC0zMHYtMzBoNDV2LTMwaC03NXYxNTBoNzV6IiBmaWxsPSIjMDYwYTdkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggaWQ9IlhNTElEXzIzNzNfIiBkPSJtMTI3IDI0MGgzMHYtMTIwaDMwdi0zMGgtOTB2MzBoMzB6IiBmaWxsPSIjMDYwYTdkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggaWQ9IlhNTElEXzIzNzRfIiBkPSJtMjQ3IDE4MGgzMHY2MGgzMHYtMTUwaC0zMHY2MGgtMzB2LTYwaC0zMHYxNTBoMzB6IiBmaWxsPSIjMDYwYTdkIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggaWQ9IlhNTElEXzIzNzdfIiBkPSJtMCAwdjUxMGg1MTB2LTUxMHptNDgwIDQ4MGgtNDUwdi00NTBoNDUweiIgZmlsbD0iIzA2MGE3ZCIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
                                        />
                                    </button>
                                )}

                                <button className="editContentBtn curBtn" onClick={editContent}>
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
                            {modal ? (
                                <div className="alert authOk" onClick={modalhandler}>
                                    <button onClick={isAuthOkHandler} className="checkAlertBtn">
                                        확인
                                    </button>
                                    투표가 완료되었습니다.
                                </div>
                            ) : null}

                            {/* 알러트창!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!알러트창~!!!!!!!!!!!!! */}

                            {votingdead ? (
                                <div className="voteOver">⌛️ 공정한 심사 감사드립니다 ⌛️</div>
                            ) : (
                                <div className="voteIng">🛎 공정한 심사 부탁드립니다 🛎</div>
                            )}
                            <ul id="curPicContainer">
                                <li className="list">
                                    <div className="picContainer curPic" onClick={getAgree}>
                                        <img
                                            src={`/upload/${content.picture_1}`}
                                            alt={content.description}
                                            className="curPicture_1 curPic curImg"></img>
                                    </div>
                                    <div className="ing">
                                        <img
                                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPHBhdGggZD0iTTQwMCwxODBjNDkuNjI2LDAsOTAtNDAuMzc0LDkwLTkwUzQ0OS42MjYsMCw0MDAsMHMtOTAsNDAuMzc0LTkwLDkwUzM1MC4zNzQsMTgwLDQwMCwxODB6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8cGF0aCBkPSJNNDg1Ljg0OCwxNzMuNzUzQzQ2NC4wNDEsMTk2LjEsNDMzLjYxNiwyMTAsNDAwLDIxMGMtMzcuODEyLDAtNzEuNTg5LTE3LjU4NS05My42MDEtNDVIMjI5djEwMWg1OXY3M2gyMjRWMjM1ICAgQzUxMiwyMTAuOTU3LDUwMS45NDksMTg5LjIzLDQ4NS44NDgsMTczLjc1M3oiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTxwb2x5Z29uIHBvaW50cz0iMzM1Ljk1Miw1MTIgNDY0LjA0OCw1MTIgNDg0LjA0OCwzNjkgMzE1Ljk1MiwzNjkgICIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wb2x5Z29uPgoJPHJlY3QgeD0iNDkiIHk9IjEzNSIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNDIiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcmVjdD4KCTxwYXRoIGQ9Ik0wLDUxMmgyNDhWMzA3SDBWNTEyeiBNMTA4LjcyOSwzOTQuOTQzTDEyNCwzNjRsMTUuMjcxLDMwLjk0M2wzNC4xNDgsNC45NjJsLTI0LjcwOSwyNC4wODZMMTU0LjU0Miw0NThMMTI0LDQ0MS45NDMgICBMOTMuNDU4LDQ1OGw1LjgzMy0zNC4wMDlsLTI0LjcwOS0yNC4wODZMMTA4LjcyOSwzOTQuOTQzeiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgo8L2c+CgoKCgoKCgoKCgoKCgoKCjwvZz48L3N2Zz4="
                                            className="voteResult"></img>
                                        {content.agree}
                                    </div>
                                </li>
                                <li className="curVersus">
                                    <img
                                        className="curVersus-img"
                                        src="https://cdn.discordapp.com/attachments/881710985335934979/882719381036093461/vs_1.png"></img>
                                </li>
                                <li className="list">
                                    <div className="picContainer curPic" onClick={getDisagree}>
                                        <img
                                            src={`/upload/${content.picture_2}`}
                                            alt={content.description}
                                            className="curPicture_2 curPic curImg"></img>
                                    </div>
                                    <div className="ing">
                                        <img
                                            className="voteResult"
                                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPHBhdGggZD0iTTQwMCwxODBjNDkuNjI2LDAsOTAtNDAuMzc0LDkwLTkwUzQ0OS42MjYsMCw0MDAsMHMtOTAsNDAuMzc0LTkwLDkwUzM1MC4zNzQsMTgwLDQwMCwxODB6IiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8cGF0aCBkPSJNNDg1Ljg0OCwxNzMuNzUzQzQ2NC4wNDEsMTk2LjEsNDMzLjYxNiwyMTAsNDAwLDIxMGMtMzcuODEyLDAtNzEuNTg5LTE3LjU4NS05My42MDEtNDVIMjI5djEwMWg1OXY3M2gyMjRWMjM1ICAgQzUxMiwyMTAuOTU3LDUwMS45NDksMTg5LjIzLDQ4NS44NDgsMTczLjc1M3oiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD4KCTxwb2x5Z29uIHBvaW50cz0iMzM1Ljk1Miw1MTIgNDY0LjA0OCw1MTIgNDg0LjA0OCwzNjkgMzE1Ljk1MiwzNjkgICIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wb2x5Z29uPgoJPHJlY3QgeD0iNDkiIHk9IjEzNSIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNDIiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcmVjdD4KCTxwYXRoIGQ9Ik0wLDUxMmgyNDhWMzA3SDBWNTEyeiBNMTA4LjcyOSwzOTQuOTQzTDEyNCwzNjRsMTUuMjcxLDMwLjk0M2wzNC4xNDgsNC45NjJsLTI0LjcwOSwyNC4wODZMMTU0LjU0Miw0NThMMTI0LDQ0MS45NDMgICBMOTMuNDU4LDQ1OGw1LjgzMy0zNC4wMDlsLTI0LjcwOS0yNC4wODZMMTA4LjcyOSwzOTQuOTQzeiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgo8L2c+CgoKCgoKCgoKCgoKCgoKCjwvZz48L3N2Zz4="></img>
                                        {content.disagree}
                                    </div>
                                </li>
                            </ul>
                            {/* ---------------------작성자프로필-------------------- */}
                            <div className="contentInfo">
                                <div className="curWriter">
                                    <div className="curWriterImg">
                                        <img
                                            src={`/upload/${content.profile_img}`}
                                            // alt="작성자 프로필 사진"
                                            className="curWriterProfile"></img>
                                    </div>
                                    <span className="curWriterName">{content.nickName}</span>
                                </div>
                                <span className="curDesc">{content.description}</span>
                            </div>
                            <div className="footer"></div>
                        </div>
                    </div>
                </>
            ) : (
                <NewContent isEdit={isEdit} content={content} setContent={setContent} setIsEdit={setIsEdit} />
            )}
        </div>
    );
}

export default CurContent;
