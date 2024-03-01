import React, { createContext, useState, useContext } from 'react';
import { LoginContext } from './LoginContexts';



export const CardDetailsContext = createContext();


export const CardDetailsProvider = ({ children }) => {

  const { loginInfo } = useContext(LoginContext);
  

  const [backlogData, setBacklogData] = useState([]);
  const [todoData, setTodoData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [doneData, setDoneData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  const [checklist, setChecklist]=useState([]);

 
  const updateSection = async (section) => {
    try{
      const userId = loginInfo.user._id;
      const url = `${process.env.REACT_APP_API_BASE_URL}/task/${userId}/${section}/${selectedPeriod}`;
      let response = await fetch( url, {
        method: "GET",
        headers: { Authorization: `Bearer ${loginInfo.token}` },
      });
      if(response.ok){
        console.log(` ${section} pull worked `); 
        let data = await response.json();
        console.log(data);
        if(section === "backlog")setBacklogData(data);
        else if(section === "progress")setProgressData(data);
        else if(section === "todo")setTodoData(data);
        else if(section === "done")setDoneData(data);
      }
      else{
        console.log(` ${section} pull didnt work`);
      }
    }catch(err){
      console.log(`${section} error`);
    }
  }



  
  return (
    <CardDetailsContext.Provider value={{ updateSection , backlogData, setBacklogData,
    todoData, setTodoData, progressData, setProgressData, doneData, setDoneData, selectedPeriod,
    setSelectedPeriod, checklist, setChecklist }}>
      {children}
    </CardDetailsContext.Provider>
  );
};
