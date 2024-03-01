import React, { createContext, useState } from 'react';


export const PopupContext = createContext();


export const PopupProvider = ({ children }) => {
  
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [showEditCardPopup, setShowEditCardPopup] = useState(false);
  const [editCardInfo, setEditCardInfo] = useState(null);
  


  
  return (
    <PopupContext.Provider value={{  showDeletePopup, setShowDeletePopup, deleteTaskId, setDeleteTaskId,
    showEditCardPopup, setShowEditCardPopup, editCardInfo, setEditCardInfo }}>
      {children}
    </PopupContext.Provider>
  );
};
