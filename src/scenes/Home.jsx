
import Menu from '../components/home-components/Menu';
import '../styles/scene-styles/Home.css';
import Board from '../components/home-components/Board';
import Settings from '../components/home-components/Settings';
import Analytics from '../components/home-components/Analytics';
import { useLocation } from 'react-router-dom';
import PopUp from '../components/widgets/PopUp';
import { useState, useContext } from 'react';
import CardPopUp from '../components/widgets/CardPopUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginContext } from '../util/contexts/LoginContexts'
import { PopupContext } from '../util/contexts/PopupContext';
import { Toaster,toast } from 'react-hot-toast';
function Home({path}) {
  
  const {showDeletePopup, deleteTaskId, showEditCardPopup, editCardInfo, setShowEditCardPopup, setEditCardInfo} = useContext(PopupContext);
  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  const [showPopup, setShowPopup] = useState(false); 
  const [showCardPopup, setShowCardPopup] = useState(false);
  
  const notify = () => {
    toast.custom((t) => (
      <div
        className="toast"
        style={{
          background: '#F6FFF9',
          color: '#27303A',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid #48C1B5',
          boxShadow: '0px 4px 16px 0px #100B2714',
          width : '8%',
          height: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center',
          fontFamily: 'Poppins',
          fontSize:'small'
          
        }}
      >
       
        <p>Link Copied!</p>
      </div>
    ),{
      duration: 500,
      position: 'top-right'
    });
  };

  const handleLogout = () => {
    setShowPopup(true); 
  };

  const handleClosePopup = () => {
    setShowPopup(false); 
  };
  const handleAddCard = () => {
    setShowCardPopup(true);
  };

  const handleCloseCardPopup = () => {
    setShowCardPopup(false);
    setEditCardInfo(null);
    setShowEditCardPopup(false);
  };

  
  return (
    <div className="home">
      <Toaster />
      <Menu handleLogout={handleLogout} />
      {showPopup && <PopUp PopUpText={'logout'} handleClose={handleClosePopup} />}
      { showDeletePopup && <PopUp PopUpText={'delete'} deleteTask={deleteTaskId}/> }
      <div className="home-main">
        <Routes>
          <Route path="settings" element={<Settings/>} />
          <Route path="board" element={<Board handleAddCard={handleAddCard} notify={notify}/>} />
          <Route path="" element={<Board handleAddCard={handleAddCard} notify={notify}/>} />
          <Route path="analytics" element={<Analytics/>} />
        </Routes>
        {(showCardPopup || showEditCardPopup) && <CardPopUp handleClose={handleCloseCardPopup} cardInfo={editCardInfo}  />}
      </div>
    </div>
  );
}

export default Home;

