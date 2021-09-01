import React, { useState } from 'react';
import Login from './LoginModal';

function LoginButton({ loginHandler }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className="modalBtn navBtn" onClick={openModal}>
                로그인
            </button>
            <Login isOpen={isModalOpen} close={closeModal} open={openModal} loginHandler={loginHandler} />
        </>
    );
}

export default LoginButton;
