import React from 'react';
import '../../styles/component-styles/PopUp.css';
import '../../styles/component-styles/Common.css';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../util/contexts/LoginContexts'
import { PopupContext } from '../../util/contexts/PopupContext';
import { CardDetailsContext } from '../../util/contexts/CardDetailsContext';
import { sectionApiMap } from '../../util/contexts/sectionMap';


function PopUp({ PopUpText, handleClose, deleteTask }) {

  const { updateSection } = useContext(CardDetailsContext);
  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  const { setShowDeletePopup, setDeleteTaskId } = useContext(PopupContext);

  const navigate = useNavigate();


  const handlePopUpClose = async (value) => {
    if(PopUpText==="logout"){
      if(value === true){
        localStorage.removeItem('LoginInfo');
        setLoginInfo(null);        
        navigate('/login');
      }
      else{
        handleClose();
      }
    }
    else if(PopUpText === "delete"){
      if(value === true ){
        const url = `${process.env.REACT_APP_API_BASE_URL}/task/delete`;
        let deleteResponse = await fetch(
          url, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${loginInfo.token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: deleteTask.id})
          }
        );
        if(deleteResponse.ok){
          console.log(`deleted ${deleteTask.id}`);
        }
        else{
          console.log("couldnt delete somehow");
        }
        updateSection(sectionApiMap.get(deleteTask.section));
        setShowDeletePopup(false);
        setDeleteTaskId(null);
      } 
      else{
        setShowDeletePopup(false);
        setDeleteTaskId(null);
      }
    }
  }
  return (
    <>
      <div className="overlay">
        <div className="popup-container">
          <p>Are you sure you want to {PopUpText}?</p>
          
          <button className='blue-btn' onClick={() => handlePopUpClose(true)}>Yes, {PopUpText}</button>
          <button className='blue-btn cancel' onClick={() => handlePopUpClose(false)}>Cancel</button>
          
        </div>
      </div>
    </>
  );
}

export default PopUp;
