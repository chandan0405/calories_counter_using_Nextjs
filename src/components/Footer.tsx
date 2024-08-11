
import React from 'react';
import '../css/Footer.css';
import { FaHome, FaChartLine, FaPlusCircle } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';


interface FooterProps {
  handleShowPopup: () => void;
}

const Footer: React.FC<FooterProps> = ({ handleShowPopup }) => {
  const router = useRouter();
  const location = usePathname();
  

  const isActiveRoute = (path: string) => location === path;

  const handleNavigation = (path: string) => {
    router.push(path)
  };

  return (
    <div className="footer">
      <button
        className={`footer-button ${isActiveRoute('/')?'active':''}`}
        onClick={() => handleNavigation('/')}
      >
        <FaHome />
        <span>Home</span>
      </button>
      <button
        className={`footer-button ${isActiveRoute('/chart')?'active':''}`}
        onClick={() => handleNavigation('/chart')}
      >
        <FaChartLine />
        <span>Analytics</span>
      </button>
      <div className="btn-container" onClick={handleShowPopup}>
        <button className="add-button">
          <FaPlusCircle className="add-icon" />
        </button>
      </div>
    </div>
  );
};

export default Footer;

