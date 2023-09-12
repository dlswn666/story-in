import React from 'react';
import styled from 'styled-components';

const TextBoxWrapper = styled.div`
    margin: 1rem 0;
    width: 400px;
`;

const Label = styled.label`
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 20px;
    color: #333;
    margin-bottom: 8px;
`;

const TextArea = styled.textarea`
    resize: none;
    border-radius: 5px;
    border: 1px solid #ccc;
    transition: border-color 0.3s ease-in-out;
    &:focus {
        border-color: #007bff; !important // 산뜻한 파란색으로 focus 시 테두리 강조
    }
    &::placeholder {
        color: #aaa; // 세련된 placeholder 색상
    }
`;

const TextBoxComponent = ({ label, value, onChange }) => (
    <TextBoxWrapper>
        <Label>{label}</Label>
        <TextArea type="text" rows="4" cols="54" value={value} onChange={onChange} />
    </TextBoxWrapper>
);

export default TextBoxComponent;
