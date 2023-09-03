import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../firebaseConfig';
import styled from 'styled-components';
import StyledInput from './InputComponent';

const ImageUpload = ({ storagePath, lastFileName, label, allowedFormats, onComplete }) => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [selectedFileName, setSelectedFileName] = useState('');

    const handleChange = (e) => {
        console.log(e.target);
        const file = e.target.files[0];
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (allowedFormats.includes(fileExtension)) {
                setImage(file);
                setSelectedFileName(file.name);
            } else {
                alert('잘못된 확장자입니다');
                if (typeof onInvalidFormat === 'function') {
                    onInvalidFormat(fileExtension);
                }
            }
        }
    };

    const handleClear = () => {
        setImage(null);
        setSelectedFileName('');
    };

    const handleUpload = () => {
        if (image) {
            const storage = getStorage(app);

            const now = new Date();
            const timestamp = `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
            const fileName = `${timestamp}_${lastFileName}`;

            const storageRef = ref(storage, `${storagePath}/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(progress);
                },
                (error) => {
                    console.error(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        onComplete(downloadURL);
                    });
                }
            );
        } else {
            alert('이미지를 등록해주세요');
        }
    };

    return (
        <>
            <Wrapper>
                <StyledLabel>{label}</StyledLabel>
                <StyledFileInput type="file" id="fileInput" onChange={handleChange} />
                <StyledInputLabel htmlFor="fileInput">파일 선택</StyledInputLabel>
                <StyledButton onClick={handleUpload}>업로드</StyledButton>
                {selectedFileName && (
                    <StyledInputWrapper>
                        <StyledInput readOnly value={selectedFileName} label="선택된 파일" />
                        <StyledButton onClick={handleClear}>취소</StyledButton>
                    </StyledInputWrapper>
                )}
                <div>
                    {progress > 0 && (
                        <div>
                            <StyledProgressWrapper>
                                <StyledProgressBar progress={progress}></StyledProgressBar>
                            </StyledProgressWrapper>
                            <StyledProgressText>{progress}%</StyledProgressText>
                        </div>
                    )}
                </div>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    margin-top: 20px;
`;
const StyledInputWrapper = styled.div`
    display: flex;
    align-items: end;
`;

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 600; // 글씨를 조금 더 진하게
    font-size: 20px;
    color: #333; // 어두운 회색
`;

const StyledFileInput = styled.input`
    display: none;
`;

const StyledInputLabel = styled.label`
    display: inline-block;
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
    &:hover {
        background-color: #0056b3;
    }
`;

const StyledButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
        background-color: #0056b3;
    }
`;

const StyledProgressWrapper = styled.div`
    width: 400px;
    height: 20px;
    background-color: #ccc;
    border-radius: 10px;
    margin-top: 10px;
`;

const StyledProgressBar = styled.div`
    width: ${(props) => props.progress || 0}%;
    height: 100%;
    background-color: #007bff;
    border-radius: 8px;
`;

const StyledProgressText = styled.span`
    font-size: 16px;
    margin-left: 10px;
    vertical-align: middle;
`;

export default ImageUpload;
