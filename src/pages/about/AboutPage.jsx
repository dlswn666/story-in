import React from 'react';
import KakaoMap from '../../components/KakaoMap';
import { styled } from 'styled-components';

const AboutPageWithMap = () => {
    return (
        <>
            <MapWrapper>
                <KakaoMap />
            </MapWrapper>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '33%', height: '400px' }}></div>
                <div>
                    <h2>content</h2>
                    <div style={{ width: '500px', height: '2px', backgroundColor: 'black' }}></div>
                    <p>버스 : </p>
                    <p>지하철 : </p>
                    <p>연락처 : </p>
                    <p>주소 : </p>
                </div>
                <div style={{ width: '33%', height: '400px' }}></div>
            </div>
        </>
    );
};

const MapWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export default AboutPageWithMap;
