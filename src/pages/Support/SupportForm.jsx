import React, { useState } from 'react';
import InputComponent from '../../components/inputComponent';
import SelectBoxComponent from '../../components/SelectBoxComponent';
import CheckBoxComponent from '../../components/CheckBoxComponent';
import PostCodeComponent from '../../components/postCodeComponent';
import DaumPostcodeEmbed from 'react-daum-postcode';
import Modal from 'react-modal';
import DatePickerComponent from '../../components/DatePickerComponent';
import { styled } from 'styled-components';

const SupportForm = () => {
    const [nameValue, setNameValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [homeTypeValue, setHomeTypeValue] = useState('');
    const [etcHomeTypeValue, setEtcHomeTypeValue] = useState('');
    const [homeYearValue, setHomeYearValue] = useState(new Date());
    const [openPostcode, setOpenPostcode] = useState(false);
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [homeSize, setHomeSize] = useState('');
    const [budget, setBudget] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const homeTypeOptions = [
        { value: '아파트', label: '아파트' },
        { value: '단독주택', label: '단독주택' },
        { value: '빌라', label: '빌라' },
        { value: '주상복합', label: '주상복합' },
    ];

    const kakaoPostCodeHandler = {
        // 버튼 클릭 이벤트
        clickInput: () => {
            setOpenPostcode((current) => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `);
            setAddress(data.address);
            setPostcode(data.zonecode);
            setOpenPostcode(false);
        },
    };

    return (
        <>
            <div style={{ display: 'flex' }}>
                <SideWrapper></SideWrapper>
                <Wrapper>
                    <SectionHeader>
                        <HeaderText>고객 기본 정보</HeaderText>
                    </SectionHeader>
                    <InputComponent
                        label="이름 *"
                        placeholder="성함을 입력해주세요"
                        inputType="text"
                        _onChange={setNameValue}
                    />
                    <p>입력된 값 : {nameValue}</p>
                    <InputComponent
                        label="연락처 *"
                        placeholder="연락처를 번호만 입력해주세요"
                        inputType="number"
                        _onChange={setPhoneValue}
                    />
                    <p>입력된 값 : {phoneValue}</p>
                    <InputComponent
                        label="E-Mail 주소 *"
                        placeholder="이메일 주소 입력해주세요"
                        inputType="email"
                        _onChange={setEmailValue}
                    />
                    <p>입력된 값 : {emailValue}</p>
                    <SelectBoxComponent label="건물 정보 *" options={homeTypeOptions} _onChange={setHomeTypeValue} />
                    <p>선택된 값: {homeTypeValue}</p>
                    {/* 추후 필요하면 추가 다시 확인*/}
                    {/* {homeTypeValue === '기타' && (
                <InputComponent
                    label="기타 정보"
                    placeholder="기타 건물 정보를 입력해주세요"
                    inputType="text"
                    _onChange={setEtcHomeTypeValue}
                />
            )}
            <p>입력된 값: {etcHomeTypeValue}</p> */}
                    <SectionHeader>
                        <HeaderText>건물 정보</HeaderText>
                    </SectionHeader>
                    <PostCodeComponent
                        label="건물 주소 *"
                        _onClick={kakaoPostCodeHandler.clickInput}
                        address={address}
                        postcode={postcode}
                    />
                    {openPostcode && (
                        <Modal
                            isOpen={openPostcode}
                            onRequestClose={() => setOpenPostcode(false)}
                            contentLabel="Address Search"
                            style={{
                                // 모달 스타일을 설정하려면 여기에 추가
                                content: {
                                    width: '520px',
                                    margin: 'auto',
                                    height: 'fit-content',
                                },
                            }}
                        >
                            <DaumPostcodeEmbed
                                onComplete={kakaoPostCodeHandler.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
                            />
                        </Modal>
                    )}
                    <DatePickerComponent
                        label="준공년도"
                        placeholderText="준공일을 선택해주세요( 대략적으로 선택 )"
                        selectedDate={homeYearValue}
                        setSelectedDate={setHomeYearValue}
                    />
                    <p>입력된 값: {homeYearValue?.toLocaleDateString()}</p>
                    <InputComponent
                        label={
                            <>
                                <span>건물 평수 *</span>
                                <br />
                                <span style={{ fontSize: '15px' }}>평형 또는 m²으로 작성</span>
                            </>
                        }
                        placeholder="평수를 입력해주세요"
                        _onChange={setEmailValue}
                    />
                    <p>입력된 값 : {emailValue}</p>
                    <DatePickerComponent
                        label="공사시작일 *"
                        placeholderText="공사 시작일을 선택해주세요"
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                    <p>입력된 값: {selectedDate?.toLocaleDateString()}</p>
                    <DatePickerComponent
                        label="입주예정일 *"
                        placeholderText="입주 예정일을 선택해주세요"
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                    <p>입력된 값: {selectedDate?.toLocaleDateString()}</p>
                    <InputComponent
                        label="예산 *(단위 : 원)"
                        placeholder="예산을 입력해주세요"
                        inputType="number"
                        _onChange={setBudget}
                    />
                    <p>입력된 값 : {budget}</p>
                    <CheckBoxComponent label="약관 동의" _onChange={setIsChecked} />
                    <p>동의 상태: {isChecked ? '동의함' : '동의하지 않음'}</p>
                </Wrapper>
                <SideWrapper></SideWrapper>
            </div>
        </>
    );
};

const Wrapper = styled.div``;
const SideWrapper = styled.div`
    width: 30%;
`;
const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
    margin-bottom: 20px;

    &::before,
    &::after {
        content: '';
        flex-grow: 1;
        height: 1px;
        background: black;
    }

    &::before {
        margin-right: 5px;
    }

    &::after {
        margin-left: 5px;
    }
`;

const HeaderText = styled.span`
    flex-grow: 1;
    padding: 0 20px;
    background: white;
    z-index: 1;
    position: relative;
`;

Modal.setAppElement('#root');

export default SupportForm;
