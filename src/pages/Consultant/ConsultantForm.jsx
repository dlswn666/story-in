import React, { useRef, useState } from 'react';
import InputComponent from '../../components/InputComponent';
import SelectBoxComponent from '../../components/SelectBoxComponent';
import CheckBoxComponent from '../../components/CheckBoxComponent';
import PostCodeComponent from '../../components/PostCodeComponent';
import DaumPostcodeEmbed from 'react-daum-postcode';
import Modal from 'react-modal';
import DatePickerComponent from '../../components/DatePickerComponent';
import styled from 'styled-components';
import ImageUpload from '../../components/ImageUpload';
import RadioComponent from '../../components/RadioComponent';
import ButtonComponent from '../../components/ButtonComponent';
import app from '../../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import TextBoxComponent from '../../components/TextBoxComponent';
import { useNavigate } from 'react-router-dom';

const SupportForm = () => {
    const [nameValue, setNameValue] = useState('');
    const nameInput = useRef(null);
    const [passwordValue, setPasswordValue] = useState('');
    const passwordInput = useRef(null);
    const [phoneValue, setPhoneValue] = useState('');
    const phoneInput = useRef(null);
    const [emailValue, setEmailValue] = useState('');
    const emailInput = useRef(null);
    const [homeTypeValue, setHomeTypeValue] = useState('아파트');
    // 추후 필요하면 추가
    // const [etcHomeTypeValue, setEtcHomeTypeValue] = useState('');
    const [homeYearValue, setHomeYearValue] = useState(new Date());
    const homeYearInput = useRef(null);
    const [openPostcode, setOpenPostcode] = useState(false);
    const [openConceptImageSelect, setOpenConceptImageSelect] = useState(false);
    const [openBathImageSelect, setOpenBathImageSelect] = useState(false);
    const [address, setAddress] = useState('');
    const addressInput = useRef(null);
    const [postcode, setPostcode] = useState('');
    const [homeSize, setHomeSize] = useState('');
    const homeSizeInput = useRef(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [additionalQuestions, setAdditionalQuestions] = useState('');

    const [constructionStartDate, setConstructionStartDate] = useState(new Date());
    const [moveInDate, setMoveInDate] = useState(new Date());
    const [constructionBudget, setConstructionBudget] = useState('');
    const [electricalWorkOption, setElectricalWorkOption] = useState('Y');
    const [builtinFurnitureOption, setBuiltinFurnitureOption] = useState('');
    const [shassisOption, setShassisOption] = useState('');
    const [expansionWork, setExpansionWork] = useState('');
    const [floorExcelWork, setFloorExcelWork] = useState('');
    const [systemACWork, setSystemACWork] = useState('Y');
    const [homeStylingService, setHomeStylingService] = useState('');
    const [mediumDoorReplacement, setMediumDoorReplacement] = useState('');
    const [conceptImages, setConceptImages] = useState([{}]);
    const [bathImages, setBathImages] = useState([{}]);
    const [progress, setProgress] = useState(0);
    const [conceptImagesDownloadURLs, setConceptImagesDownloadURLs] = useState([]);
    const [bathImagesDownloadURLs, setBathImagesDownloadURLs] = useState([]);

    const navigate = useNavigate();

    const [selectedBathOption, setSelectedBathOption] = useState('');
    const radioYNOption = {
        Y: '필요',
        N: '불필요',
    };
    const electricOption = [
        { value: '해당사항 없음', label: '해당사항 없음' },
        { value: '콘센트 스위치 교체', label: '콘센트 스위치 교체' },
        { value: '전체 조명 교체', label: '전체 조명 교체' },
        { value: '간접신설', label: '간접신설' },
        { value: '기타', label: '기타' },
    ];

    const homeTypeOptions = [
        { value: '아파트', label: '아파트' },
        { value: '단독주택', label: '단독주택' },
        { value: '빌라', label: '빌라' },
        { value: '주상복합', label: '주상복합' },
    ];
    const furnitureOptions = [
        { value: '해당사항 없음', label: '해당사항 없음' },
        { value: '주방', label: '주방' },
        { value: '주방외', label: '주방외' },
        { value: '리폼', label: '리폼' },
    ];

    const shassisOptions = [
        { value: '해당사항 없음', label: '해당사항 없음' },
        { value: '전체 샤시 교체', label: '전체 샤시 교체' },
        { value: '부분 샤시 교체', label: '부분샤시교체' },
        { value: '샤시 틀만 필름', label: '샤시 틀만 필름' },
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

    const ImageHandler = (images, flage, lastFileName, storagePath) => {
        console.log(lastFileName);
        const stateSetters = {
            conceptImages: setConceptImages,
            bathImages: setBathImages,
        };

        const stateClose = {
            conceptImages: setOpenConceptImageSelect,
            bathImages: setOpenBathImageSelect,
        };
        if (flage === 'Y') {
            Object.keys(stateSetters).forEach((key) => {
                if (lastFileName === key) {
                    stateSetters[key](images);
                }
            });
            Object.keys(stateClose).forEach((key) => {
                if (lastFileName === key) {
                    stateClose[key](false);
                }
            });
        } else {
            Object.keys(stateClose).forEach((key) => {
                if (lastFileName === key) {
                    stateClose[key](false);
                }
            });
        }
    };

    const imageRemove = (indexToRemove, type) => {
        console.log('확인');
        if (type === 'bath') {
            const filteredImages = bathImages.filter((_, index) => index !== indexToRemove);
            setBathImages(filteredImages);
        } else {
            const filteredImages = conceptImages.filter((_, index) => index !== indexToRemove);
            setConceptImages(filteredImages);
        }
    };

    const cancelSubmit = () => {
        navigate('/Consultant');
    };

    const ImageUploadFunction = async (imagesArray, lastFileName, storagePath) => {
        const downloadURLs = [];
        const storage = getStorage(app);
        console.log('ImageUploadFunction', lastFileName);
        console.log('ImageUploadFunction', storagePath);
        if (imagesArray && imagesArray.length > 0) {
            const uploadPromises = imagesArray.map((imageData, index) => {
                const { file } = imageData;
                if (file) {
                    const now = new Date();
                    const timestamp = `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${index}`;
                    const fileName = `${timestamp}_${lastFileName}`;

                    const storageRef = ref(storage, `${storagePath}/${fileName}`);
                    const uploadTask = uploadBytesResumable(storageRef, file);

                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            setProgress(progress);
                        },
                        (error) => {
                            console.error(error);
                        },
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            downloadURLs.push(downloadURL);
                        }
                    );
                    return uploadTask;
                }
                return null;
            });

            await Promise.all(uploadPromises);

            // null 또는 undefined인 값을 제거하고 '/'로 구분자를 추가하여 문자열로 만듭니다.
            const joinedDownloadURLs = downloadURLs.filter((url) => url).join('|');

            return joinedDownloadURLs;
        }
    };

    const handleImageUpload = async () => {
        let conceptUrls = [];
        let bathUrls = [];
        console.log(conceptImages.length);
        console.log(bathImages.length);
        console.log(conceptImages[0]);
        console.log(bathImages[0]);
        if (conceptImages.length > 0 && conceptImages[0]) {
            conceptUrls = await ImageUploadFunction(conceptImages, 'conceptImges', 'conceptImges');
            setConceptImagesDownloadURLs(conceptUrls);
        }

        if (bathImages.length > 0 && bathImages[0]) {
            bathUrls = await ImageUploadFunction(bathImages, 'bathImages', 'bathImages');
            setBathImagesDownloadURLs(bathUrls);
        }
    };

    const submitForm = async () => {
        if (!nameValue) {
            alert('이름은 필수 입력사항 입니다.');
            nameInput.current.focus();
            return;
        } else if (!phoneValue) {
            alert('연락처는 필수 입력사항 입니다.');
            phoneInput.current.focus();
        } else if (!passwordInput) {
            alert('비밀번호는 필수 입력사항 입니다.');
            passwordInput.current.focus();
        } else if (/^\d{1,4}$/.test(passwordInput)) {
            alert('비밀번호는 4자리 숫자만 입력 가능합니다');
            passwordInput.current.focus();
        } else if (!emailValue) {
            alert('E-mail은 필수 입력 사항입니다.');
            emailInput.current.focus();
        } else if (!address) {
            alert('주소는 필수 입력사항 입니다.');
            addressInput.current.focus();
        } else {
            let formData = {
                nameValue,
                passwordValue,
                phoneValue,
                emailValue,
                homeTypeValue,
                homeYearValue,
                address,
                postcode,
                homeSize,
                isChecked,
                constructionStartDate: constructionStartDate.toISOString(),
                moveInDate: moveInDate.toISOString(),
                constructionBudget,
                electricalWorkOption,
                builtinFurnitureOption,
                expansionWork,
                floorExcelWork,
                systemACWork,
                homeStylingService,
                mediumDoorReplacement,
                shassisOption,
                conceptImagesDownloadURLs,
                bathImagesDownloadURLs,
                submitDate: new Date().toUTCString(),
            };
            try {
                await handleImageUpload();
                const storage = getStorage(app);
                // Firestore에 데이터 추가
                const db = getFirestore(app); // app은 초기화된 Firebase 앱 인스턴스입니다.
                const docRef = await addDoc(collection(db, 'consultantRequest'), formData);
                alert('문의 완료.견적서 확인 후 연락 드리겠습니다.');
                console.log(formData);
                console.log('Document written with ID: ', docRef.id);
            } catch (error) {
                console.log(error);
            }
        }
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
                        required={true}
                        ref={nameInput}
                        autoFocus
                    />
                    <InputComponent
                        label="비밀번호(4자리 숫자) *"
                        placeholder="비밀번호를 입력해주세요 "
                        inputType="password"
                        maxLength="4"
                        _onChange={setPasswordValue}
                        required={true}
                        ref={passwordInput}
                        autoFocus
                    />
                    <InputComponent
                        label="연락처 *"
                        placeholder="연락처를 번호만 입력해주세요"
                        inputType="number"
                        ref={phoneInput}
                        required={true}
                        _onChange={setPhoneValue}
                    />
                    <InputComponent
                        label="E-Mail 주소 *"
                        placeholder="이메일 주소 입력해주세요"
                        inputType="email"
                        ref={emailInput}
                        required={true}
                        _onChange={setEmailValue}
                    />
                    <SelectBoxComponent label="건물 정보 *" options={homeTypeOptions} _onChange={setHomeTypeValue} />
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
                    <p>{homeTypeValue}</p>
                    <SectionHeader>
                        <HeaderText>건물 정보</HeaderText>
                    </SectionHeader>
                    <PostCodeComponent
                        label="건물 주소 *"
                        _onClick={kakaoPostCodeHandler.clickInput}
                        address={address}
                        postcode={postcode}
                        ref={addressInput}
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
                        ref={homeYearInput}
                    />
                    <InputComponent
                        label={
                            <>
                                <span>건물 평수 *</span>
                                <br />
                                <span style={{ fontSize: '15px' }}>평형 또는 m²으로 작성</span>
                            </>
                        }
                        placeholder="평수를 입력해주세요"
                        _onChange={setHomeSize}
                        ref={homeSizeInput}
                    />
                    <SectionHeader>
                        <HeaderText>공사 의뢰 정보</HeaderText>
                    </SectionHeader>
                    <DatePickerComponent
                        label="공사시작일 *"
                        placeholderText="공사 시작일을 선택해주세요"
                        selectedDate={constructionStartDate}
                        setSelectedDate={setConstructionStartDate}
                    />
                    <p>{constructionStartDate.toISOString()}</p>
                    <DatePickerComponent
                        label="입주예정일 *"
                        placeholderText="입주 예정일을 선택해주세요"
                        selectedDate={moveInDate}
                        setSelectedDate={setMoveInDate}
                    />
                    <InputComponent
                        label="예산 *(단위 : 원)"
                        placeholder="예산을 입력해주세요"
                        inputType="number"
                        _onChange={setConstructionBudget}
                    />

                    <RadioComponent
                        label="욕실 공사"
                        name="bath"
                        options={radioYNOption}
                        _onChange={setSelectedBathOption}
                    />
                    {selectedBathOption === 'Y' && (
                        <ButtonComponent
                            label="욕실 컨셉 이미지 업로드"
                            buttonName="이미지 업로드"
                            onClick={() => {
                                setOpenBathImageSelect(true);
                            }}
                        />
                    )}
                    {openBathImageSelect && (
                        <Modal
                            isOpen={openBathImageSelect}
                            onRequestClose={() => setOpenBathImageSelect(false)}
                            contentLabel="Address Search"
                            style={{
                                // 모달 스타일을 설정하려면 여기에 추가
                                content: {
                                    width: '600px',
                                    margin: 'auto',
                                    height: 'fit-content',
                                    display: 'flex',
                                    justifyContent: 'center',
                                },
                            }}
                        >
                            <ImageUpload
                                storagePath="bathImages"
                                lastFileName="bathImages"
                                label="욕실 컨셉 이미지 업로드"
                                allowedFormats={['jpg', 'jpeg', 'png', 'gif']}
                                onComplete={ImageHandler}
                                maxImages="5"
                            />
                        </Modal>
                    )}
                    {bathImages.map((imageData, index) => (
                        <div key={index} className="image-container">
                            {imageData.url ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <StyledImagePreview src={imageData.url} />
                                        <ButtonComponent
                                            buttonName="취소"
                                            onClick={() => imageRemove(index, 'bath')}
                                            style={{
                                                height: '40px',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                marginLeft: '30px',
                                            }}
                                        />
                                    </div>
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    ))}
                    <RadioComponent
                        label="확장 공사"
                        name="expansionWork"
                        options={radioYNOption}
                        _onChange={setExpansionWork}
                    />
                    <RadioComponent
                        label="바닥 엑셀 공사"
                        name="floorExcelWork"
                        options={radioYNOption}
                        _onChange={setFloorExcelWork}
                    />
                    <RadioComponent
                        label="시스템 에어컨 공사"
                        name="systemACWork"
                        options={radioYNOption}
                        _onChange={setSystemACWork}
                        initialValue={'Y'}
                    />
                    <RadioComponent
                        label="중문 교체"
                        name="mediumDoorReplacement"
                        options={radioYNOption}
                        _onChange={setMediumDoorReplacement}
                    />
                    <RadioComponent
                        label="홈스타일링 서비스"
                        name="homeStylingService"
                        options={radioYNOption}
                        _onChange={setHomeStylingService}
                    />
                    <SelectBoxComponent
                        label="전기 공사"
                        options={electricOption}
                        _onChange={setElectricalWorkOption}
                    />
                    <SelectBoxComponent
                        label="붙박이 가구 공사"
                        options={furnitureOptions}
                        _onChange={setBuiltinFurnitureOption}
                    />
                    <SelectBoxComponent label="샤시 공사" options={shassisOptions} _onChange={setShassisOption} />
                    <SectionHeader>
                        <HeaderText>인테리어 컨셉 이미지 업로드</HeaderText>
                    </SectionHeader>
                    <ButtonComponent
                        label="인테리어 컨셉 이미지 업로드"
                        buttonName="이미지 업로드"
                        onClick={() => {
                            setOpenConceptImageSelect(true);
                        }}
                    />
                    {openConceptImageSelect && (
                        <Modal
                            isOpen={openConceptImageSelect}
                            onRequestClose={() => setOpenConceptImageSelect(false)}
                            contentLabel="Address Search"
                            style={{
                                // 모달 스타일을 설정하려면 여기에 추가
                                content: {
                                    width: '600px',
                                    margin: 'auto',
                                    height: 'fit-content',
                                    display: 'flex',
                                    justifyContent: 'center',
                                },
                            }}
                        >
                            <ImageUpload
                                storagePath="conceptImages"
                                lastFileName="conceptImages"
                                label="인테리어 컨셉 이미지 업로드"
                                allowedFormats={['jpg', 'jpeg', 'png', 'gif']}
                                onComplete={ImageHandler}
                                maxImages="5"
                            />
                        </Modal>
                    )}
                    <p>{uploadedImageUrl}</p>
                    {conceptImages.map((imageData, index) => (
                        <div key={index} className="image-container">
                            {imageData.url ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <StyledImagePreview src={imageData.url} />
                                        <ButtonComponent
                                            buttonName="취소"
                                            onClick={() => imageRemove(index, 'concept')}
                                            style={{
                                                height: '40px',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                marginLeft: '30px',
                                            }}
                                        />
                                    </div>
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    ))}
                    <TextBoxComponent label="추가 요청 사항" onChange={setAdditionalQuestions} />
                    <ButtonWrapper>
                        <ButtonComponent buttonName="견적 문의" onClick={submitForm} />
                        <ButtonComponent buttonName="수정" onClick={submitForm} />
                        <ButtonComponent buttonName="취소" onClick={cancelSubmit} />
                    </ButtonWrapper>
                    <CheckBoxComponent label="약관 동의" _onChange={setIsChecked} />
                </Wrapper>
                <SideWrapper></SideWrapper>
            </div>
            <div style={{ height: '300px' }}></div>
        </>
    );
};

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Wrapper = styled.div`
    width: 50%;
`;
const SideWrapper = styled.div`
    width: 25%;
`;
const StyledImagePreview = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1; // 이 부분은 원하는 대로 설정하세요
    margin-top: 20px;
    & img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }

    & i.material-icons {
        font-size: 48px; // 아이콘 크기, 원하는 대로 설정
    }
`;
const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
    margin-bottom: 20px;
    margin-top: 20px;

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
    position: relative;
`;

Modal.setAppElement('#root');

export default SupportForm;
