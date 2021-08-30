import React, { useState } from 'react';
import Signup from './SignUpModal';

function SignUpButton() {
    const [isModalOpen, setIsModalOpen] = useState({
        isModalOpen: false,
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className="modalBtn" onClick={openModal}>
                회원가입
            </button>
            <Signup isOpen={isModalOpen} close={closeModal} />
        </>
    );
}

export default SignUpButton;
