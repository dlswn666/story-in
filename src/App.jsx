import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import NavBar from './components/NavBar';
import Main from './pages/Main';
import AboutPage from './pages/about/AboutPage';
import ConsultantQuery from './pages/Consultant/ConsultantQuery';
import ConsultantForm from './pages/Consultant/ConsultantForm';
import AdminPage from './pages/admin/AdminPage';
import ProjectMain from './pages/project/ProjectMain';
import ProjectDetail from './pages/project/ProjectDetail';
import styled from 'styled-components';

const Layout = () => {
    return (
        <>
            <PageWrapper>
                <ContentWrapper>
                    <NavBar />
                    <div className="nav-space"></div>
                    <Outlet />
                </ContentWrapper>
            </PageWrapper>
        </>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/*" element={<Layout />}>
                    <Route path="main" element={<Main />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="consultant" element={<ConsultantQuery />} />
                    <Route path="consultantForm" element={<ConsultantForm />} />
                    <Route path="project" element={<ProjectMain />} />
                    {/* <Route path="projectDetail" element={<ProjectDetail />} /> */}
                    <Route path="project/:projectId" element={<ProjectDetail />} />
                    <Route path="admin" element={<AdminPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

const PageWrapper = styled.div``;

const ContentWrapper = styled.div`
    max-width: 1900px;
    width: 100%;
    margin: 0 auto;

    @media (max-width: 1920px) {
        max-width: 1600px;
    }

    @media (max-width: 1600px) {
        max-width: 1400px;
    }

    @media (max-width: 1400px) {
        max-width: 1200px;
    }

    @media (max-width: 1200px) {
        max-width: 1000px;
    }

    @media (max-width: 1000px) {
        max-width: 800px;
    }

    @media (max-width: 800px) {
        max-width: 600px;
    }

    @media (max-width: 600px) {
        max-width: 100%;
        padding: 0 20px;
    }
`;

export default App;
