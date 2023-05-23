import React from 'react';
import '../css/MainPageStyle.css';

const MainPage = () => {
  return (
    <div className="main-page">
      <h2 className='title'>Main Page</h2>
      <div className="image-container">
        <div className="row">
          <div className="image-wrapper">
            <img src="/images/introImage1.jpg" alt="Product  1" />
          </div>
          <div className="image-wrapper">
            <img src="/images/introImage2.jpg" alt="Product  2" />
          </div>
          <div className="image-wrapper">
            <img src="/images/introImage3.jpg" alt="Product  3" />
          </div>
        </div>
        <div className="row">
          <div className="image-wrapper">
            <img src="/images/introImage4.jpg" alt="Product  4" />
          </div>
          <div className="image-wrapper">
            <img src="/images/introImage5.jpg" alt="Product  5" />
          </div>
          <div className="image-wrapper">
            <img src="/images/introImage1.jpg" alt="Product  6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;