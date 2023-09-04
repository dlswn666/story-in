import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../firebaseConfig';
import styled from 'styled-components';

const ImageUpload = ({ storagePath, lastFileName, label, allowedFormats, onComplete, maxImages = 1 }) => {
    const [images, setImages] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleChange = (e, index) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            const newImages = [...images];
            newImages[index] = { file, url: reader.result };
            setImages(newImages);
        });

        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (allowedFormats.includes(fileExtension)) {
                reader.readAsDataURL(file); // 확장자가 올바르면 파일 읽기를 시작합니다.
            } else {
                alert('잘못된 확장자입니다');
                if (typeof onInvalidFormat === 'function') {
                    onInvalidFormat(fileExtension);
                }
            }
        }
    };

    const handleUpload = () => {
        const storage = getStorage(app);
        console.log('images', images);
        if (images) {
            images.forEach((imageData, index) => {
                console.log('index', index);
                const { file } = imageData;
                console.log('file', file);
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
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                console.log('File available at', downloadURL);
                                onComplete(downloadURL);
                            });
                        }
                    );
                }
            });
        } else {
            alert('이미지를 등록해주세요');
        }
    };

    return (
        <>
            <Wrapper>
                <StyledLabel>{label}</StyledLabel>
                {images.map((imageData, index) => (
                    <div key={index} className="image-container">
                        <StyledFileInput
                            type="file"
                            id={`fileInput_${index}`}
                            onChange={(e) => handleChange(e, index)}
                        />
                        {imageData.url ? (
                            <StyledImagePreview
                                src={imageData.url}
                                onClick={() => document.getElementById(`fileInput_${index}`).click()}
                            />
                        ) : (
                            <StyledMaterial>
                                <i
                                    className="material-icons"
                                    onClick={() => document.getElementById(`fileInput_${index}`).click()}
                                    style={{ fontSize: '80px', cursor: 'pointer' }}
                                >
                                    add_a_photo
                                </i>
                            </StyledMaterial>
                        )}
                    </div>
                ))}
                {images.length < maxImages && (
                    <StyledAddButton
                        onClick={() => {
                            setImages([...images, {}]);
                        }}
                    >
                        Add Image
                    </StyledAddButton>
                )}
                <StyledButton onClick={handleUpload}>Upload</StyledButton>
                <div>
                    {progress > 0 && (
                        <StyledProgressWrapper>
                            <StyledProgressBar progress={progress} />
                        </StyledProgressWrapper>
                    )}
                </div>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    margin-top: 20px;
`;

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 20px;
    color: #333;
`;

const StyledFileInput = styled.input`
    display: none;
`;

const StyledMaterial = styled.div``;

const StyledImagePreview = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1; // 이 부분은 원하는 대로 설정하세요

    & img {
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }

    & i.material-icons {
        font-size: 48px; // 아이콘 크기, 원하는 대로 설정
    }
`;

const StyledAddButton = styled.button`
    display: inline-block;
    width: 100px;
    height: 100px;
    border: 2px dashed gray;
    border-radius: 8px;
    cursor: pointer;
`;

const StyledButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
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

export default ImageUpload;
