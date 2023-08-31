import React from 'react';
import styled from 'styled-components';

const CheckBoxComponent = ({ label, _onChange, ...restProps }) => {
    const handleChange = (e) => {
        _onChange(e.target.checked);
    };

    return (
        <Wrapper>
            <StyledLabel>{label}</StyledLabel>
            <StyledCheckbox type="checkbox" onChange={handleChange} {...restProps} />
        </Wrapper>
    );
};

CheckBoxComponent.defaultProps = {
    label: '체크해주세요',
    _onChange: () => {},
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const StyledCheckbox = styled.input`
    margin-left: 10px;
    cursor: pointer;
`;

const StyledLabel = styled.label`
    font-size: 16px;
    color: #333;
`;

export default CheckBoxComponent;
