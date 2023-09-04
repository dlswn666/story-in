import React from 'react';
import styled from 'styled-components';

const RadioComponent = ({ label, name, options, _onChange }) => {
    return (
        <Wrapper>
            <StyledTopLabel>{label}</StyledTopLabel>
            {Object.keys(options).map((key, index) => (
                <RadioWrapper key={index}>
                    <StyledInput
                        type="radio"
                        id={`${name}-${key}`}
                        name={name}
                        value={key}
                        onChange={(e) => _onChange(e.target.value)}
                    />
                    <StyledLabel htmlFor={`${name}-${key}`}>{options[key]}</StyledLabel>
                </RadioWrapper>
            ))}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const RadioWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 8px 5px;
`;

const StyledInput = styled.input`
    opacity: 0;
    position: absolute;
    &:checked + label {
        background: #007bff;
        color: white;
    }
`;

const StyledLabel = styled.label`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
`;

const StyledTopLabel = styled.label`
    font-weight: 600; // 글씨를 조금 더 진하게
    font-size: 17px;
    color: #333; // 어두운 회색
    margin-right: 10px;
    width: 180px;
`;

export default RadioComponent;
