import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { styled } from 'styled-components';

const DatePickerComponent = forwardRef(({ selectedDate, setSelectedDate, label, placeholderText }, ref) => {
    const CustomInput = React.forwardRef(({ value, onClick }, innerRef) => (
        <input ref={innerRef} onClick={onClick} value={value} readOnly />
    ));

    return (
        <DatePickerWrapper>
            <StyledLabel>{label}</StyledLabel>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd" // 원하는 포맷으로 날짜 표시
                isClearable // 날짜 선택 취소 가능하게 만들기 위한 옵션
                placeholderText={placeholderText}
                customInput={<CustomInput ref={ref} />}
            />
        </DatePickerWrapper>
    );
});

const DatePickerWrapper = styled.div`
    margin-top: 20px;
    width: 370px;
    input {
        width: 370px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 0 15px;
        font-size: 16px;
        outline: none;
        transition: border-color 0.3s ease-in-out;

        &:focus {
            border-color: #007bff;
        }

        &::placeholder {
            color: #aaa;
        }
    }
`;

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 600; // 글씨를 조금 더 진하게
    font-size: 20px;
    color: #333; // 어두운 회색
`;

export default DatePickerComponent;
