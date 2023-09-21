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
                    <div style={{ height: '100px', margin: '30px 60px' }}></div>
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
    width: 1900px;
    margin: 0 auto;
`;

export default App;
