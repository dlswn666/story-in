import React from 'react';
import '../css/MainPageStyle.css';

const MainPage = () => {
    return (
        <div className='main-page'>
            <div className='image-container'>
                <div className='row'>
                    <div className='image-wrapper'>
                        <img src='/images/introImage1.jpg' alt='Product  1' />
                        <div className='image-overlay'>
                            <p className='image-text'>Image 1 Description</p>
                        </div>
                    </div>
                    <div className='image-wrapper'>
                        <img src='/images/introImage2.jpg' alt='Product  2' />
                        <div className='image-overlay'>
                            <p className='image-text'>Image 2 Description</p>
                        </div>
                    </div>
                    <div className='image-wrapper'>
                        <img src='/images/introImage3.jpg' alt='Product  3' />
                        <div className='image-overlay'>
                            <p className='image-text'>Image 3 Description</p>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='image-wrapper'>
                        <img src='/images/introImage4.jpg' alt='Product  4' />
                        <div className='image-overlay'>
                            <p className='image-text'>Image 4 Description</p>
                        </div>
                    </div>
                    <div className='image-wrapper'>
                        <img src='/images/introImage5.jpg' alt='Product  5' />
                        <div className='image-overlay'>
                            <p className='image-text'>Image 5 Description</p>
                        </div>
                    </div>
                    <div className='image-wrapper'>
                        <img src='/images/introImage1.jpg' alt='Product  6' />
                        <div className='image-overlay'>
                            <p className='image-text'>Image 6 Description</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
