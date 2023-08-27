import React, { useState, useEffect } from 'react';
import ImageCard from '../components/ImageCard';
import { styled } from 'styled-components';

const Main = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const savedImages = localStorage.getItem('images');
        if (savedImages) {
            const parsedImages = JSON.parse(savedImages);
            setImages(parsedImages.slice(0, 8));
        }
    }, []);

    return (
        <ImageGrid>
            {/* 이미지 카드 컴포넌트에 이미지 데이터를 전달 */}
            {images.map((image) => (
                <ImageCard
                    key={image.id}
                    imageSrc={image.urls.regular}
                    altText={image.description}
                    text="Your text here" // 텍스트 내용 변경 가능
                />
            ))}
        </ImageGrid>
    );
};

const ImageGrid = styled.div`
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(4, 1fr);

    // 화면 크기가 768px 미만일 때
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }

    // 화면 크기가 480px 미만일 때
    @media (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

export default Main;
