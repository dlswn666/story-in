import React from 'react';
import styled from 'styled-components';

const InputComponent = ({ label, placeholder, _onChange, inputType, ...restProps }) => {
    const handleChange = (e) => {
        _onChange(e.target.value);
    };

    return (
        <>
            <Wrapper>
                <StyledLabel>{label}</StyledLabel>
                <StyledInput onChange={handleChange} placeholder={placeholder} type={inputType} {...restProps} />
            </Wrapper>
        </>
    );
};

InputComponent.defaultProps = {
    label: '텍스트',
    placeholder: '텍스트를 입력하세요.',
    _onChange: () => {},
    inputType: 'text',
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin-top: 20px;
`;

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 600; // 글씨를 조금 더 진하게
    font-size: 20px;
    color: #333; // 어두운 회색
`;

const StyledInput = styled.input`
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 0 15px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease-in-out;

    &:focus {
        border-color: #007bff; // 산뜻한 파란색으로 focus 시 테두리 강조
    }

    &::placeholder {
        color: #aaa; // 세련된 placeholder 색상
    }
`;

export default InputComponent;
