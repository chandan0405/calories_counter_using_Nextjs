
import React from 'react';
import '../css/Footer.css';
// import {  useLocation } from 'react-router-dom';
import { FaHome, FaChartLine, FaPlusCircle } from 'react-icons/fa';

const Footer = ({ handleShowPopup }) => {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const isActiveRoute = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    // navigate(path);
  };

  return (
    <div className="footer">
      <button
        className={`footer-button`}
        // onClick={() => handleNavigation('/')}
      >
        <FaHome />
        <span>Home</span>
      </button>
      <button
        className={`footer-button`}
        // onClick={() => handleNavigation('/chart')}
      >
        <FaChartLine />
        <span>Analytics</span>
      </button>
      <div className='btn-container' onClick={handleShowPopup}>
        <button className="add-button">
          <FaPlusCircle className='add-icon' />
        </button>
      </div>
    </div>
  );
};

export default Footer;
