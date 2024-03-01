import React, { useState, useEffect, useContext } from "react";
import "../../styles/component-styles/CardPopUp.css";
import { useNavigate } from "react-router-dom";
import TaskList from "./TaskList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LoginContext } from "../../util/contexts/LoginContexts";
import { CardDetailsContext } from '../../util/contexts/CardDetailsContext';
import { sectionApiMap } from "../../util/contexts/sectionMap";


function CardPopUp({ handleClose, cardInfo }) {

  const { updateSection, checklist, setChecklist } = useContext(CardDetailsContext);
 
  const { loginInfo } = useContext(LoginContext);


  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(0);
  const [taskLists, setTaskLists] = useState([]);
  const [taskStatus, setTaskStatus] = useState();
  const [priority, setPriority] = useState("LOW PRIORITY");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [isDue, setIsDue] = useState(false);
  
  const handleDueDateChange = (date) => {
    setIsDue(true);
    setDueDate(date);
  };


  const addCard = async () => {
    
    const userId = loginInfo.user._id;
    let ISODueDate = null; 

    if (dueDate) { 
      ISODueDate = dueDate.toISOString(); 
    }

    const payload = {
      userId: userId,
      title: title,
      priority: priority,
      isDue: isDue,
      section: "To Do",
      dueDate: ISODueDate,
      checklist: checklist,
    };
    console.log(payload);

    const url = `${process.env.REACT_APP_API_BASE_URL}/task/create`;
    const response = await fetch( url, {
      method: "POST",
      headers: { 
        'Authorization': `Bearer ${loginInfo.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return response;
  }
  
  const editCard = async () => {  
    const userId = loginInfo.user._id;
    let ISODueDate = null; 

    const payload = {
      _id: cardInfo._id,
      userId: userId,
      title: title,
      priority: priority,
      isDue: isDue,
      section: cardInfo.section,
      dueDate: dueDate,
      checklist: checklist,
    };
    console.log(payload);

    const url = `${process.env.REACT_APP_API_BASE_URL}/task/edit`;
    const response = await fetch( url, {
      method: "PATCH",
      headers: { 
        'Authorization': `Bearer ${loginInfo.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    return response;
  }

  const handleAddCard = async (value) => {
    if (value === true) {
      if(cardInfo){
        let response = await editCard();
        if(response.ok){
          response = await response.json();
          updateSection(sectionApiMap.get(cardInfo.section));
          console.log(response);
        }
        else{
          console.log("couldnt edit due to som error");
        }
      }
      else{
        console.log("I'm creating a new card");
        let response = await addCard();
        if(response.ok){
          response = await response.json();
          updateSection("todo");
          console.log(response);
        }
        else{
          console.log("couldnt add due to som error");
        }
      }
      
      setChecklist([]);
      handleClose();
    } else {
      setChecklist([]);
      handleClose();
    }
  }
  function AddNewList() {
    const newChecklist = { description: "", isChecked: false };
    setChecklist([...checklist, newChecklist]);
    setTotal(total + 1);
  }

  useEffect(() => {
    if(cardInfo){
      setPriority(cardInfo.priority);
      setTitle(cardInfo.title);
      setIsDue(cardInfo.isDue);
      if(cardInfo.isDue){
        setDueDate(cardInfo.dueDate);
      }
      setChecklist(cardInfo.checklist);

      let totalTasks=0;
      let doneTasks=0;
      for (const listTask of cardInfo.checklist) {
        console.log(listTask);
        totalTasks++;
        if(listTask.isChecked)doneTasks++;
      }
      setTotal(totalTasks);
      setDone(doneTasks);
    }
  }, []);
  

  return (
    <>
      <div className="overlay">
        <div className="card-popup-container">
          <div className="cp-content">
            <div className="cp-input">
              <label>
                Title <span className="asterisk">*</span>
              </label>
              <input placeholder="Enter Task Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            </div>

            <div className="cp-select">
              <p>
                Select Priority <span className="asterisk">*</span>
              </p>
              <div className="cp-select-priorities">
                <div
                  className={`priority ${priority === "HIGH PRIORITY" ? 'selected' : ''}`}
                  onClick={() => setPriority("HIGH PRIORITY")}
                >
                  <span className="bullet-point">&#8226;</span>
                  <p>HIGH PRIORITY</p>
                </div>
                <div
                  className={`priority ${priority === "MODERATE PRIORITY" ? 'selected' : ''}`}
                  onClick={() => setPriority("MODERATE PRIORITY")}
                >
                  <span className="bullet-point m">&#8226;</span>
                  <p>MODERATE PRIORITY</p>
                </div>
                <div
                  className={`priority ${priority === "LOW PRIORITY" ? 'selected' : ''}`}
                  onClick={() => setPriority("LOW PRIORITY")}
                >
                  <span className="bullet-point l">&#8226;</span>
                  <p>LOW PRIORITY</p>
                </div>
              </div>
            </div>
            <div className="cp-checklist">
              <p>
                Checklist({done}/{total}) <span className="asterisk">*</span>
              </p>
            </div>
            <div className="listbox cp">
              {checklist.map((taskList, index) => {
                return <TaskList checklistNumber={index} canEdit={true} done={done} setDone={setDone} total={total} setTotal={setTotal} />
              })}
            </div>
            <div className="cp-checklist">
              <button className="add-task-btn" onClick={() => AddNewList()}>
                + Add New
              </button>
            </div>
            
          </div>

          <div className="cp-content-2">
            <div className="cp-date-picker">
              <DatePicker
                className="date-picker"
                selected={dueDate}
                onChange={handleDueDateChange}
                placeholderText="Select Due Date"
              >
                {" "}
              </DatePicker>{" "}
            </div>

            <div className="cp-buttons">
              <button className="btn" onClick={() => handleAddCard(false)}>
                Cancel
              </button>
              <button className="btn save" onClick={() => handleAddCard(true)}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardPopUp;
