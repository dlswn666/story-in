import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navigation.css';

const Navigation = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-container-sub">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/main" className="nav-link">Main</Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">About</Link>
        </li>
        {/* 다른 페이지에 대한 링크를 추가할 수 있습니다 */}
      </ul>
    </nav>
  );
};

export default Navigation;