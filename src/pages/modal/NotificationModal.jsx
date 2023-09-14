import React from 'react';
import styled from 'styled-components';

const NotificationModal = ({ isopen, message, onClose, onConfirm, type, confirmFlag }) => {
    return isopen === 'true' ? (
        <ModalWrapper isopen={isopen}>
            <ModalContent>
                <p>{message}</p>
                {type === 'confirm' ? (
                    <>
                        <button onClick={() => onConfirm(confirmFlag)}>확인</button>
                        <button onClick={onClose}>취소</button>
                    </>
                ) : (
                    <button onClick={() => onConfirm(confirmFlag)}>확인</button>
                )}
            </ModalContent>
        </ModalWrapper>
    ) : null;
};

const ModalWrapper = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background-color: #ffffff;
    padding: 20px;
    border-radius: 4px;
    width: 300px;
    text-align: center;
`;

export default NotificationModal;
