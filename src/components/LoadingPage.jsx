import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingPage = ({ isLoading }) => {
    return (
        <Wrapper>
            {isLoading ? (
                // 로딩 중인 경우 스피너 또는 로딩 메시지를 표시합니다.
                <Loader />
            ) : // 로딩이 완료된 경우 아무것도 표시하지 않습니다.
            null}
        </Wrapper>
    );
};

// 회전 애니메이션 키프레임
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

// 스피너 스타일을 정의한 styled-components 컴포넌트
const Loader = styled.div`
    border: 4px solid rgba(255, 255, 255, 0.3); /* 스피너 테두리 스타일 및 색상 */
    border-top: 4px solid #3498db; /* 스피너 윗부분 색상 */
    border-radius: 50%; /* 원형 스피너를 위한 테두리 반지름 */
    width: 40px; /* 스피너 너비 */
    height: 40px; /* 스피너 높이 */
    animation: ${spin} 1s linear infinite; /* 회전 애니메이션 */
    margin: 0 auto; /* 중앙 정렬 */
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* 화면 높이의 100%로 컨테이너를 화면 중앙에 정렬 */
`;

export default LoadingPage;
