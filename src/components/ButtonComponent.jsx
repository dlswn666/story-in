import React from 'react';
import { styled } from 'styled-components';

const ButtonComponent = ({ label, onClick, style }) => {
    return (
        <>
            <StyledButton onClick={onClick} style={style}>
                {label}
            </StyledButton>
        </>
    );
};

const StyledButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        background-color: #0056b3;
    }
`;

export default ButtonComponent;
