import React, { useState } from 'react';
import styled from 'styled-components';

const SlideComponent = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else if (currentIndex === 0) {
            console.log('영이야');
            setCurrentIndex(images.length - 1);
        }
    };

    const handleNextClick = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (currentIndex === images.length - 1) {
            setCurrentIndex(0);
        }
    };

    return (
        <SlideContainer>
            <ArrowButtonLeft onClick={handlePrevClick}>&#8249;</ArrowButtonLeft>
            <ImageWrapper currentIndex={currentIndex}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        className={index === currentIndex ? 'active' : ''}
                    />
                ))}
            </ImageWrapper>
            <ArrowButtonRight onClick={handleNextClick}>&#8250;</ArrowButtonRight>
        </SlideContainer>
    );
};

const SlideContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 800px; // 슬라이드 최대 너비 설정
    margin: 0 auto;
    overflow: hidden;
`;

const ImageWrapper = styled.div`
    display: flex;
    align-items: center; // 수직 가운데 정렬
    justify-content: space-between; // 좌우 정렬
    transform: translateX(-${(props) => props.currentIndex * 100}%);
    transition: transform 0.3s ease; // 슬라이딩 애니메이션 효과
    position: relative;
`;

const Image = styled.img`
    flex-shrink: 0;
    width: 100%;
    height: auto;
`;

const ArrowButtonLeft = styled.button`
    position: absolute;
    top: 50%;
    left: 0;
    background: transparent;
    border: none;
    font-size: 100px;
    cursor: pointer;
    transform: translateY(-50%);
    z-index: 1;
`;

const ArrowButtonRight = styled.button`
    position: absolute;
    top: 50%;
    right: 0;
    background: transparent;
    border: none;
    font-size: 100px;
    cursor: pointer;
    transform: translateY(-50%);
    z-index: 1;
`;

export default SlideComponent;
