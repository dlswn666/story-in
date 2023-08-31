import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

const Landingpage = () => {
    const [sortImages, setSortImages] = useState([]);
    const [index, setIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);

    useEffect(() => {
        const accessKey = import.meta.env.VITE_IMAGE_API_KEY; // <-- Replace this with your own key or keep it as it is and replace later
        // Uncomment below line and replace YOUR_ACCESS_KEY with your actual API key
        // const accessKey = 'YOUR_ACCESS_KEY';

        axios
            .get('https://api.unsplash.com/search/photos', {
                headers: {
                    Authorization: `Client-ID ${accessKey}`,
                },
                params: {
                    query: 'interior',
                    per_page: 30,
                },
            })
            .then((response) => {
                const randomImages = response.data.results.sort(() => 0.5 - Math.random()).slice(0, 5);
                setSortImages(randomImages);
            })
            .catch((error) => {
                console.error('Error fetching images from Unsplash', error);
            });
    }, []);

    useEffect(() => {
        if (isChanging) {
            const timeout = setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % 5);
                setIsChanging(false);
            }, 15000);
            return () => clearTimeout(timeout);
        }
    }, [isChanging]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsChanging(true);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: '100%', position: 'relative', height: '100vh', overflow: 'hidden' }}>
            {sortImages[index] && (
                <StyledImage
                    key={sortImages[index].id}
                    src={sortImages[index].urls.full}
                    alt={sortImages[index].description}
                />
            )}
            <Title onClick={() => (window.location.href = '/main')}>StoryIn</Title>
        </div>
    );
};

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const StyledImage = styled.img`
    width: 100%;
    height: 100vh;
    object-fit: cover;
    animation: ${fadeIn} 1.5s forwards, ${fadeOut} 12s 1.5s forwards;
    margin: 0;
    padding: 0;
`;

const Title = styled.h1`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    font-size: 3rem; // Adjust the size as needed
    cursor: pointer;
    font-family: 'Arial', sans-serif; // Change this to a more attention-grabbing font if needed
`;

export default Landingpage;
