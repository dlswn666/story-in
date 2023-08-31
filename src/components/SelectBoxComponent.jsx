import React from 'react';
import styled from 'styled-components';

const SelectBoxComponent = ({ label, options, _onChange, ...restProps }) => {
    const handleChange = (e) => {
        _onChange(e.target.value);
    };

    return (
        <Wrapper>
            {label && <StyledLabel>{label}</StyledLabel>}
            <StyledSelect onChange={handleChange} {...restProps}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </StyledSelect>
        </Wrapper>
    );
};

SelectBoxComponent.defaultProps = {
    label: '선택하세요',
    options: [],
    _onChange: () => {},
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
`;

const StyledLabel = styled.label`
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 20px;
    color: #333;
`;

const StyledSelect = styled.select`
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 0 10px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease-in-out;

    &:focus {
        border-color: #007bff;
    }
`;

export default SelectBoxComponent;
