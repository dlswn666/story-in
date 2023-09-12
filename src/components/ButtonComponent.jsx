import React from 'react';
import { styled } from 'styled-components';

const ButtonComponent = ({ label, buttonName, onClick, style }) => {
    return (
        <>
            <StyledLabel>{label}</StyledLabel>
            <StyledButton onClick={onClick} style={style}>
                {buttonName}
            </StyledButton>
        </>
    );
};

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 20px;
    color: #333;
`;

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
