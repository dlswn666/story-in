import React, { useState } from 'react';
import InputComponent from '../../components/InputComponent';
import styled from 'styled-components';
import ButtonComponent from '../../components/ButtonComponent';
import ImageUpload from '../../components/ImageUpload';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import app from '../../firebaseConfig';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import NotificationModal from '../modal/NotificationModal';
import LoadingPage from '../../components/LoadingPage';

const ProjectUpload = () => {
    const [formData, setFormData] = useState({
        picName: '',
        contentText1: '',
        contentText2: '',
        contentText3: '',
    });
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [uploadImage, setUploadImage] = useState([{}]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('alert');
    const [modalFlag, setModalFlag] = useState('');
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleCancel = () => {
        console.log('취소');
        navigate('/project');
    };

    const handleEdit = () => {
        console.log('수정');
    };

    const handleDelete = () => {
        console.log('삭제');
    };

    const ImageHandler = (images, flage, lastFileName, storagePath) => {
        console.log(images);
        if (flage === 'Y') {
            setUploadImage(images);
            setImageModalOpen(false);
        } else {
            setImageModalOpen(false);
        }
    };

    const modalSet = (message, type, flag) => {
        setModalOpen('true');
        setModalMessage(message);
        setModalType(type);
        setModalFlag(flag);
    };

    const ImageUploadFunction = async (imagesArray, lastFileName, storagePath) => {
        const downloadURLs = [];
        const storage = getStorage(app);
        if (imagesArray && imagesArray.length > 0) {
            const uploadPromises = imagesArray.map(async (imageData, index) => {
                const { file } = imageData;
                if (file) {
                    const now = new Date();
                    const timestamp = `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${index}`;
                    const fileName = `${timestamp}_${lastFileName}`;
                    const storageRef = ref(storage, `${storagePath}/${fileName}`);
                    return await uploadFileAndGetURL(storageRef, file);
                }
                return null;
            });

            const resolvedDownloadURLs = await Promise.all(uploadPromises);
            downloadURLs.push(...resolvedDownloadURLs.filter((url) => url));

            const joinedDownloadURLs = downloadURLs.join('|');
            return joinedDownloadURLs;
        }
    };

    const uploadFileAndGetURL = async (storageRef, file) => {
        return new Promise((resolve, reject) => {
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress); // 이 부분은 상태를 관리하는 로직이므로 그대로 둡니다.
                },
                (error) => {
                    console.error(error);
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                }
            );
        });
    };

    const handleImageUpload = async () => {
        const projectImageUrls = await ImageUploadFunction(uploadImage, 'projectImages', 'projectImages');

        return projectImageUrls;
    };

    const handleSave = async () => {
        try {
            const projectImageUrls = await handleImageUpload();

            let formValues = {
                picName: formData.picName,
                contentText1: formData.contentText1,
                contentText2: formData.contentText2,
                contentText3: formData.contentText3,
                projectImages: projectImageUrls,
                submitDate: new Date().toLocaleString('en-US', {
                    timeZone: 'Asia/Seoul',
                }),
            };

            const database = getFirestore(app);
            const projectsRef = await addDoc(collection(database, 'projects'), formValues);
            const message = '저장 완료.';
            const modalType = 'alert';
            const modalFlag = 'success';
            setIsLoading(false);
            modalSet(message, modalType, modalFlag);
        } catch (e) {
            console.error('데이터 저장 중 오류 발생', e);
        }
    };

    const imageRemove = (indexToRemove, type) => {
        const filteredImages = uploadImage.filter((_, index) => index !== indexToRemove);
        setUploadImage(filteredImages);
    };

    const onConfirm = (flag) => {
        if (flag === 'remove') {
            removeForm();
        } else if (flag === 'success') {
            navigate('/Consultant');
        } else {
            setModalOpen(false);
        }
    };

    const handleChange = (value, name) => {
        console.log(name);
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log('변경?');
        console.log(name);
        console.log(value);
    };

    return (
        <>
            <Wrapper>
                <form action="submit">
                    <InputComponent
                        label="이미지 제목"
                        placeholder="이미지 제목을 입력해주세요"
                        inputType="text"
                        value={formData.picName}
                        name="picName"
                        _onChange={handleChange}
                    />
                    <InputComponent
                        label="컨텐트 내용"
                        placeholder="컨텐트 내용"
                        inputType="text"
                        value={formData.contentText1}
                        name="contentText1"
                        _onChange={handleChange}
                    />
                    <InputComponent
                        label="컨텐트 내용"
                        placeholder="컨텐트 내용"
                        inputType="text"
                        value={formData.contentText2}
                        name="contentText2"
                        _onChange={handleChange}
                    />
                    <InputComponent
                        label="컨텐트 내용"
                        placeholder="컨텐트 내용"
                        inputType="text"
                        value={formData.contentText3}
                        name="contentText3"
                        _onChange={handleChange}
                    />
                    <ButtonComponent
                        label="Project 이미지"
                        buttonName="이미지 업로드"
                        type="button"
                        onClick={() => {
                            setImageModalOpen(true);
                        }}
                    />
                    {imageModalOpen && (
                        <Modal
                            isOpen={imageModalOpen}
                            onRequestClose={() => setImageModalOpen(false)}
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
                                storagePath="projectImage"
                                lastFileName="projectImage"
                                label="프로젝트 이미지 업로드"
                                allowedFormats={['jpg', 'jpeg', 'png', 'gif']}
                                onComplete={ImageHandler}
                                maxImages="10"
                            />
                        </Modal>
                    )}
                    {uploadImage.map((imageData, index) => (
                        <div key={index} className="image-container">
                            {imageData.url ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <StyledImagePreview src={imageData.url} />
                                        <ButtonComponent
                                            buttonName="취소"
                                            onClick={() => imageRemove(index, 'projectImage')}
                                            type="button"
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
                    <NotificationModal
                        isopen={modalOpen}
                        message={modalMessage}
                        onClose={() => setModalOpen(false)}
                        onConfirm={() => onConfirm(modalFlag)}
                        type={modalType}
                        confirmFlag={modalFlag}
                    />
                    <ButtonWrapper>
                        <ButtonComponent buttonName="저장" onClick={handleSave} type="button" />
                        <ButtonComponent buttonName="취소" onClick={handleCancel} type="button" />
                        <ButtonComponent buttonName="삭제" onClick={handleDelete} type="button" />
                        <ButtonComponent buttonName="수정" onClick={handleEdit} type="button" />
                    </ButtonWrapper>
                    <LoadingPage isLoading={isLoading} />
                </form>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    padding-top: 2rem;
    display: flex;
    justify-content: center;
}
`;

const ButtonWrapper = styled.div`
    display: flex;
    padding-top: 2rem;
    justify-content: end;
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

export default ProjectUpload;
