import React, { useState, useEffect, useContext } from "react";
import "../../styles/component-styles/Card.css";
import more from "../../assets/icons/more.png";
import collapse from "../../assets/icons/collapse.png";
import uncollapse from "../../assets/icons/uncollapse.png";
import TaskList from "./TaskList";
import Filter from "./Filter";
import { LoginContext } from '../../util/contexts/LoginContexts'
import { CardDetailsContext } from '../../util/contexts/CardDetailsContext';
import { PopupContext } from '../../util/contexts/PopupContext';
import {sectionApiMap, sectionDBMap} from "../../util/contexts/sectionMap";


function Card({ item, collapseAll, isShare,notify, setCollapseAll }) {

  const { setShowDeletePopup, setDeleteTaskId, setShowEditCardPopup, setEditCardInfo} = useContext(PopupContext);
  const { updateSection } = useContext(CardDetailsContext);
  const { loginInfo } = useContext(LoginContext);
  const [currentSection, setCurrentSection] = useState('');
  const [isListboxVisible, setIsListboxVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  

  let doneItemsTasks=0;
  let totalItemsTasks=0;

  for (const listTask of item.checklist) {
    totalItemsTasks++;
    if(listTask.isChecked)doneItemsTasks++;
  }
  console.log(`sugeeeee !!! ${doneItemsTasks}`);
  useEffect(() => {
    if (item.section === "To Do") {
      setCurrentSection("TO-DO");
    } else if (item.section === "In Progress") {
      setCurrentSection("PROGRESS");
    } else if (item.section === "Backlog") {
      setCurrentSection("BACKLOG");
    } else {
      setCurrentSection("DONE");
    }

    if (collapseAll === true) {
      setIsListboxVisible(false);
      setIsCollapsed(true);
    }
  }, [collapseAll]);

  const toggleListboxVisibility = () => {
    setIsListboxVisible(!isListboxVisible);
    setIsCollapsed(!isCollapsed);
    console.log("nigaa");
    setCollapseAll(false);
  };

  const handleEditItem = async (item) => {
    setEditCardInfo(item);
    setShowEditCardPopup(true);
  }

  const handleShareItem = async (itemData) => {
    
    allSections.map((ele1, index) => {
      console.log(ele1)
      console.log(index)
    });

    if (!(itemData.shareId)) {
      
      const randomString = Math.floor(Math.random() * 10000).toString();
      const payload = {
        shareId: randomString,
        _id: itemData._id
      };
      const url = `${process.env.REACT_APP_API_BASE_URL}/task/edit`;
      console.log(url);
      let response = await fetch(
        url, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${loginInfo.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );
      if(response.ok){
        console.log("did work !")
        let shareUrl = `${process.env.REACT_APP_SELF_BASE_URL}/share?shareId=${randomString}`
        await navigator.clipboard.writeText(shareUrl);
        updateSection(sectionApiMap.get(itemData.section));
      }
    }
    else{
      console.log(process.env.REACT_APP_SELF_BASE_URL);
      let shareUrl = `${process.env.REACT_APP_SELF_BASE_URL}/share?shareId=${itemData.shareId}`
      await navigator.clipboard.writeText(shareUrl);
    }
  }

  const handleDeleteItem = async (itemData) => {
    setDeleteTaskId({id: itemData._id, section: itemData.section});
    setShowDeletePopup(true);
  }
  const formatDate = (dueDate) => {
    if (!dueDate) {
      return ''; 
    }  
    const date = new Date(dueDate);
  
    if (isNaN(date.getTime())) {
      return ''; 
    }
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const suffix = (day === 1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';
    return `${month} ${day}${suffix}`;
  };
  
  function handleMenuClick(option) {
    console.log(option);
    if (option === "Edit") {
      handleEditItem(item);
    } else if (option === "Share") {
      handleShareItem(item);
      
    } else if (option === "Delete") {
      handleDeleteItem(item);
    }
    setSelectedOption(option);
    setShowFilter(false);
  }

  const allSections = ["BACKLOG", "TO-DO", "PROGRESS", "DONE"];
  const otherSections = allSections.filter((s) => s !== currentSection);
  
  const changeSection = async (section, item) => {
    const payload = {
      section: sectionDBMap.get(section),
      _id: item._id
    };
    const url = `${process.env.REACT_APP_API_BASE_URL}/task/edit`;
    console.log(url);
    let response = await fetch(
      url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${loginInfo.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );
    if(response.ok){
      console.log("change section worked !!!! did work !")
      updateSection(sectionApiMap.get(item.section));
      updateSection(sectionApiMap.get(sectionDBMap.get(section)));
    }
  }
  return (
    <div className="card">
      <div className="card-row">
        <div className="card-priority">
          <span className={`bullet-point${item.priority === 'MODERATE PRIORITY' ? ' m' : item.priority === 'LOW PRIORITY' ? ' l' : ''}`}>
            &#8226;
          </span>
          <p>{item.priority}</p>
        </div>
        {!isShare && (
          <>
            <img
              src={more}
              alt="more"
              onClick={() => setShowFilter(!showFilter)}
            />
            {showFilter && (
              <Filter
                text1={"Edit"}
                text2={"Share"}
                text3={"Delete"}
                onSelectPeriod={handleMenuClick}
                notify = {notify}
                
              />
            )}
          </>
        )}
      </div>
      <div className="card-row h4"><h4>{item.title}</h4></div>
      
      
      <div className="card-row">
        <p>Checklist ({doneItemsTasks}/{totalItemsTasks})</p>
        {!isShare && (<img
          src={isCollapsed ? uncollapse : collapse}
          alt="collapse"
          className={isCollapsed ? "collapse-button rotated" : "collapse-button"}
          onClick={toggleListboxVisibility}
        />)}
      </div>
      {isListboxVisible && (
  <div className={isShare ? "card-row listbox share" : "card-row listbox"}>
    {item.checklist.map((data , index, array) => (
        <TaskList canEdit={false} isShare={isShare} data={data} checklistNumber={index} cardItem={item} />
      ))}
  </div>
)}
     
      {!isShare && ( <div className={`card-row btn ${!item.isDue  ? 'card-row btn-alt' : ''}`}>
  
      {item.isDue && (
    <div className={`due-date-btn ${currentSection === 'DONE' ? 'done' : (new Date(item.dueDate) < new Date() ? '' : 'due')}`}>
      {formatDate(item.dueDate)}
    </div>
)}

  
    <div className={`section-btns ${!item.isDue ? 'section-btns-alt' : ''}`}>
      {otherSections.map((section) => (
        <button className="section-btn" key={section} onClick={() => changeSection(section , item)}>
          {section}
        </button>
      ))}
    </div>
  
</div>)}
{isShare && formatDate(item.dueDate) && (
  <div className="share-dueDate">
    <p>Due Date</p>
    <div className="due-date-btn">{formatDate(item.dueDate)} </div>
  </div>
)}

    </div>
  );
}

export default Card;