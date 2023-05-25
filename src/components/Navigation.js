import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navigation.css';

const Navigation = () => {
    return (
        <nav className='nav-container'>
            <div className='emtyContainer1'></div>
            <div className='content-container'>
                <div className='headerTitle'>
                    <Link to='/' className='nav-link'>
                        <h2 className='nav-item title'>StoryIn</h2>
                    </Link>
                </div>
                <div className='nav-combine'>
                    <ul className='nav-container-sub'>
                        <li className='nav-item'>
                            <Link to='/main' className='nav-link'>
                                Main
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/about' className='nav-link'>
                                About
                            </Link>
                        </li>
                        {/* 다른 페이지에 대한 링크를 추가할 수 있습니다 */}
                    </ul>
                </div>
            </div>
            <div className='emtyContainer2'></div>
        </nav>
    );
};

export default Navigation;
