import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoIcon from '../../assets/logo/codesandbox.png';
import board from '../../assets/icons/board.png';
import board1 from '../../assets/icons/board1.png';
import analytics from '../../assets/icons/analytics.png';
import analytics1 from '../../assets/icons/analytics1.png';
import settings from '../../assets/icons/settings.png';
import settings1 from '../../assets/icons/settings1.png';
import logout from '../../assets/icons/Logout.png';
import '../../styles/component-styles/Menu.css';
import { LoginContext } from '../../util/contexts/LoginContexts'


function Menu({ handleLogout }) {

  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  
  const [activeMenu, setActiveMenu] = useState('');
  const [boardImage, setBoardImage] = useState(board);
  const [analyticsImage, setAnalyticsImage] = useState(analytics);
  const [settingsImage, setSettingsImage] = useState(settings);

  const handleMenuClick = (menuName) => {
    
    setBoardImage(board);
    setAnalyticsImage(analytics);
    setSettingsImage(settings);
  
    setActiveMenu(menuName);
    if (menuName === 'board') {
      setBoardImage(board1);
    } else if (menuName === 'analytics') {
      setAnalyticsImage(analytics1);
    } else if (menuName === 'settings') {
      setSettingsImage(settings1);
    }
  };
  
 
  return (
    <div className='menu'>
      <div>
        <div className='menu-row top'>
          <img src={logoIcon} alt='logo'></img>
          <p>Pro Manage</p>
        </div>
        <Link to="/board">
          <div className={`menu-row ${activeMenu === 'board' ? 'active' : ''}`} onClick={() => handleMenuClick('board')}>
            <img src={boardImage} alt='board'></img>
            <p>Board</p>
          </div>
        </Link>
        <Link to="/analytics">
          <div className={`menu-row ${activeMenu === 'analytics' ? 'active' : ''}`} onClick={() => handleMenuClick('analytics')}>
            <img src={analyticsImage} alt='analytics'></img>
            <p>Analytics</p>
          </div>
        </Link>
        <Link to="/settings">
          <div className={`menu-row ${activeMenu === 'settings' ? 'active' : ''}`} onClick={() => handleMenuClick('settings')}>
            <img src={settingsImage} alt='settings'></img>
            <p>Settings</p>
          </div>
        </Link>
      </div>
      <div>
        <div className='menu-row logout' onClick={handleLogout}>
          <img src={logout} alt='logout' ></img>
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default Menu;
