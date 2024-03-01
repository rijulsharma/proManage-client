import React, { useState, useContext } from 'react';
import check from '../../assets/icons/check.png';
import uncheck from '../../assets/icons/uncheck.png';
import Delete from '../../assets/icons/delete.png';
import '../../styles/component-styles/TaskList.css'

import { CardDetailsContext } from '../../util/contexts/CardDetailsContext';
import { LoginContext } from '../../util/contexts/LoginContexts';
import { sectionApiMap } from '../../util/contexts/sectionMap';

function TaskList({checklistNumber ,canEdit, isShare , cardItem, data, done, setDone, total, setTotal}) {

  const { loginInfo } = useContext(LoginContext);

  let key = checklistNumber;
  console.log(key);


  const { checklist, setChecklist, updateSection } = useContext(CardDetailsContext);
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = async() => {
    if(!canEdit && !isShare){
      
      let tempItem = {
        description: data.description,
        isChecked: !data.isChecked
      }
      let newChecklist = cardItem.checklist.map((item, i) => (i === key ? tempItem : item));
      const payload = {
        _id: cardItem._id,
        checklist: newChecklist
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
        updateSection(sectionApiMap.get(cardItem.section));
      }
    }
    else if (!isShare) {
      let tempItem = {
        description: checklist[key].description,
        isChecked: !(checklist[key].isChecked)
      }
      setDone(checklist[key].isChecked ? done-1 : done+1);
      setChecklist(checklist.map((item, i) => (i === key ? tempItem : item)));
    }
  };


  const removeChecklistItem = () => {
    setTotal(total-1);
    setDone( checklist[key].isChecked ? done -1 : done );
    setChecklist(checklist.filter((_, i) => i !== key));

  };

  const editItem = (newVal) => {
    let tempItem = {
      description: newVal,
      isChecked: checklist[key].isChecked
    }
    setChecklist(checklist.map((item, i) => (i === key ? tempItem : item)));
  };
  console.log("inside element");

       
  return (
    <div className={canEdit ? 'taskList' : 'taskList card'}>
      { canEdit ?
        <div className='task-input'>
          { (checklist[key] && checklist[key].isChecked) ? (
            <img src={check} alt='tick' onClick={() => toggleCheckbox()} />
          ) : (
            <img src={uncheck} alt='untick' onClick={() => toggleCheckbox()} />
          )}
          <input placeholder='Add a task' value={checklist[key].description} onChange={(e) => editItem(e.target.value)} />
        </div> : 
        <div className='task-input'>
          <div className='checkbox'>
            { (data && data.isChecked) ? (
              <img src={check} alt='tick' onClick={() => toggleCheckbox()} />
            ) : (
              <img src={uncheck} alt='untick' onClick={() => toggleCheckbox()} />
            )}
          </div>
          <div className='checklistItem'><p>{data.description}</p></div>
        </div>
      }
      {canEdit && (
      <img src={Delete} alt='del' onClick={() => removeChecklistItem()} />
      )}
    </div>
  );
}

export default TaskList;