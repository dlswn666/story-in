import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import MainPage from './pages/MainPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<IntroPage />} />
                <Route
                    path='/main'
                    element={
                        <div className='mainContainer'>
                            <Navigation />
                            <MainPage />
                            <Footer />
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
