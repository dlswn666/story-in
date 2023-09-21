import React, { useState, useEffect } from 'react';
import ImageCard from '../components/ImageCard';
import { styled } from 'styled-components';
import app from '../firebaseConfig';
import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import LoadingPage from '../components/LoadingPage';

const Main = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getImages = async () => {
        const storage = getStorage(app);
        const imagesRef = ref(storage, 'landingImages');

        // Firebase로부터 이미지 목록 가져오기
        const { items } = await listAll(imagesRef);
        const downloadURLs = await Promise.all(items.map((item) => getDownloadURL(item)));

        // 이미지 URL로 상태 업데이트
        setImages(downloadURLs);
        setIsLoading(false);
    };

    useEffect(() => {
        getImages(); // <--- 수정된 부분
    }, []);

    return (
        <ImageGrid>
            {/* 이미지 카드 컴포넌트에 이미지 데이터를 전달 */}
            {isLoading ? (
                <>
                    <LoadingPage isLoading={isLoading} />
                </>
            ) : (
                <>
                    {images.map((image, index) => (
                        <ImageCard key={index} imageSrc={image} altText="Description here" text="Your text here" />
                    ))}
                </>
            )}
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
