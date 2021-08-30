import { useState } from 'react';
import axios from 'axios';
import './CurContent.css';

function CurContent({ content }) {
    console.log(content);
    const [isAuthOk, setIsAuthOk] = useState(false); // session id 를 보내고 인증이 완료되어 투표한 경우
    const [isAuthNot, setIsAuthNot] = useState(false);

    const isAuthOkHandler = () => {
        setIsAuthOk(true);
    };

    const isAuthNotHandler = () => {
        setIsAuthNot(false);
    };

    // const getAgree = () => {
    //     axios.get(`https://localhost:80/content/agree/${id}`).then((res) => {
    //         if (res.message === 'agree complete') return isAuthOkHandler();
    //         else {
    //             return isAuthNotHandler();
    //         }
    //     });
    // };

    // const getDisagree = () => {
    //     axios.get(`https://localhost:80/content/disagree/${id}`).then((res) => {
    //         if (res.message === 'disagree complete') return isAuthOkHandler();
    //         else {
    //             return isAuthNotHandler();
    //         }
    //     });
    // };

    // const deleteContent = () => {
    //     axios.delete(`https://localhost:80/content/${id}`).then((res) => {
    //         if (res.message === 'delete complete') {
    //             isAuthOkHandler();
    //         } else {
    //             isAuthNotHandler();
    //         }
    //     });
    // };

    return (
        <div>
            <div className="curContent">
                <h2>{content.title}</h2>
                <button className="editContent"></button>
                {/* <button className="deleteContent" onClick={deleteContent}></button> */}
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
                        <ul>
                            <li>
                                {/* <img
                                    src={content.picture_1}
                                    alt={content.description}
                                    className="picture_1"
                                    onClick={getAgree}></img> */}
                            </li>
                            <li className="versus">
                                <span>vs</span>
                            </li>
                            <li>
                                {/* <img
                                    src={content.picture_2}
                                    alt={content.description}
                                    className="picture_2"
                                    onClick={getDisagree}></img> */}
                            </li>
                        </ul>
                        <div className="contentInfo">
                            <div className="writer">
                                {/* <img src={content.profile_img} alt="작성자 프로필 사진" className="writerProfile"></img> */}
                                <span>작성자: {content.nickname}</span>
                            </div>
                            <span>{content.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurContent;
