import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import NavBar from './components/NavBar';
import Main from './pages/Main';
import AboutPage from './pages/about/AboutPage';
import SupportForm from './pages/Support/SupportForm';

const Layout = () => {
    return (
        <>
            <div style={{ margin: '60px 200px' }}>
                <NavBar />
                <div style={{ height: '100px', margin: '30px 60px' }}></div>
                <Outlet />
            </div>
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
                    <Route path="supportForm" element={<SupportForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
