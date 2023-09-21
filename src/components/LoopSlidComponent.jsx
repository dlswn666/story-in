import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LoopSlideComponent = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedImages, setDisplayedImages] = useState([]);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === 0) {
                return images.length - 1;
            } else {
                return prevIndex - 1;
            }
        });
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex === images.length - 1) {
                return 0;
            } else {
                return prevIndex + 1;
            }
        });
    };

    useEffect(() => {
        // 이미지 배열을 중앙 이미지가 현재 슬라이드 중앙에 위치하도록 조정
        const centerIndex = currentIndex;
        let leftIndex = centerIndex - 1;
        if (leftIndex < 0) {
            leftIndex = images.length - 1;
        }
        let rightIndex = centerIndex + 1;
        if (rightIndex >= images.length) {
            rightIndex = 0;
        }
        const displayedImages = [images[leftIndex], images[centerIndex], images[rightIndex]];
        setDisplayedImages(displayedImages);
        console.log('확인');
    }, [currentIndex, images]);

    return (
        <SlideContainer>
            <ArrowButtonLeft onClick={handlePrevClick}>&#8249;</ArrowButtonLeft>
            <ImageWrapper currentIndex={currentIndex}>
                {displayedImages.map((image, index) => (
                    <Image key={index} src={image} alt={`Image ${index}`} className={index === 1 ? 'active' : ''} />
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

export default LoopSlideComponent;
