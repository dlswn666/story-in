import { useState } from 'react';
import styled from 'styled-components';

const ImageUpload = ({ storagePath, lastFileName, label, allowedFormats, onComplete, maxImages = 1 }) => {
    const [images, setImages] = useState([{}]);

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
                            <StyledMaterial onClick={() => document.getElementById(`fileInput_${index}`).click()}>
                                <i className="material-icons" style={{ fontSize: '40px', cursor: 'pointer' }}>
                                    add_a_photo
                                </i>
                                <p style={{ marginTop: 0 }}>Add Image</p>
                            </StyledMaterial>
                        )}
                    </div>
                ))}
                <StyledButtonWrapper>
                    {images.length < maxImages && (
                        <StyledButton
                            onClick={() => {
                                setImages([...images, {}]);
                            }}
                        >
                            Add Image
                        </StyledButton>
                    )}
                    <StyledButton
                        onClick={() => {
                            const flage = 'Y';
                            onComplete(images, flage, storagePath, lastFileName);
                        }}
                    >
                        Complete
                    </StyledButton>
                    <StyledCancleButton
                        onClick={() => {
                            const flage = 'N';
                            onComplete(images, flage, storagePath, lastFileName);
                        }}
                    >
                        <i className="material-icons" style={{ fontSize: '40px', cursor: 'pointer' }}>
                            close
                        </i>
                    </StyledCancleButton>
                </StyledButtonWrapper>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    margin-top: 5px;
    width: 320px;
`;

const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const StyledLabel = styled.label`
    display: block;
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 20px;
    color: #333;
`;

const StyledFileInput = styled.input`
    display: none;
`;

const StyledMaterial = styled.div`
    display: flex;
    align-content: flex-end;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100px;
    height: 100px;
    border: 2px dashed gray;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
    &:hover {
        background-color: #f5f5f5;
    }
`;

const StyledImageContainer = styled.div``;

const StyledImagePreview = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 8px;
    cursor: pointer;
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
    &:hover {
        background-color: #0056b3;
    }
`;

const StyledCancleButton = styled.button`
    position: absolute;
    top: 20px;
    right: 10px;
    border: none;
    background-color: white;
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
