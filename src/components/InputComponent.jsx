import React, { forwardRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const InputComponent = forwardRef(({ label, placeholder, _onChange, inputType, required, ...restProps }, ref) => {
    const [isEmpty, setIsEmpty] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        _onChange(e.target.value);

        if (required) {
            setIsEmpty(value === '');
        }
    };

    return (
        <>
            <Wrapper>
                <StyledLabel>{label}</StyledLabel>
                <StyledInput
                    ref={ref}
                    onChange={handleChange}
                    placeholder={placeholder}
                    type={inputType}
                    required={required}
                    {...restProps}
                />
                {required && isEmpty && <StyledSpan>필수 입력항목입니다.</StyledSpan>}
            </Wrapper>
        </>
    );
});

InputComponent.defaultProps = {
    label: '텍스트',
    placeholder: '텍스트를 입력하세요.',
    _onChange: () => {},
    inputType: 'text',
    required: false,
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

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const StyledSpan = styled.span`
    color: red;
    font-size: 14px;
    margin-top: 4px;
    animation: ${fadeIn} 0.5s ease-in;
`;

export default InputComponent;
