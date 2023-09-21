import React from 'react';
import TabComponent from '../../components/TabComponent';
import ProjectUpload from './ProjectUpload';
import LandingImageChange from './LandingImageChange';

const AdminPage = () => {
    return (
        <>
            <TabComponent>
                <ProjectUpload label="프로젝트 게시물 등록" />
                <LandingImageChange label="랜딩 페이지 이미지 변경" />
            </TabComponent>
        </>
    );
};

export default AdminPage;
