import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignOut() {
    const [auth, setAuth] = useState(''); // 여기서 관리 안할듯
    const history = useHistory();
    const logOutRequestHandler = () => {
        auth.invalidate(); // 정보를 지운다
        history.push('/'); // 메인으로 이동
    };

    return (
        <>
            <button className="modalBtn" onClick={logOutRequestHandler}>
                로그아웃
            </button>
        </>
    );
}

export default SignOut;
