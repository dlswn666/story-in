import React from 'react';
import { styled } from 'styled-components';

const ImageCard = ({ imageSrc, altText, text }) => {
    return (
        <IamgeCardContainer>
            <Image src={imageSrc} alt={altText} />
            <ImageText>{text}</ImageText>
        </IamgeCardContainer>
    );
};

const IamgeCardContainer = styled.div`
    height: 300px;
    overflow: hidden;
    position: relative;
    cursor: pointer;

    &:hover img {
        filter: blur(5px);
    }
    &:hover div {
        opacity: 1;
    }
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.3s ease;
`;
const ImageText = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-itemes: center;
    background: rgba(255, 255, 255, 0.3);
    color: white;
    font-size: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
`;

export default ImageCard;
