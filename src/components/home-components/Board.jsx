import React, { useState, useEffect, useContext } from 'react';
import '../../styles/component-styles/Board.css';
import dropdown from '../../assets/icons/dropdown.png'
import Section from './Section';
import Filter from '../widgets/Filter';
import { LoginContext } from '../../util/contexts/LoginContexts'
import { CardDetailsContext } from '../../util/contexts/CardDetailsContext';

function Board({ handleAddCard,notify }) {
  const { loginInfo } = useContext(LoginContext);
  const { updateSection , backlogData, setBacklogData,
    todoData, setTodoData, progressData, setProgressData, doneData, setDoneData, selectedPeriod, setSelectedPeriod } = useContext(CardDetailsContext);
  const [currentDate, setCurrentDate] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  
  useEffect(() => {

    updateCurrentDate();
    updateSection("backlog");
    updateSection("todo");
    updateSection("progress");
    updateSection("done");
  }, [selectedPeriod]);

  function updateCurrentDate() {
    const currentDateObj = new Date();
    const day = currentDateObj.getDate();
    const suffix = (day >= 11 && day <= 13) ? 'th' : ['th', 'st', 'nd', 'rd'][day % 10] || 'th';
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = day + suffix + ' ' + monthNames[currentDateObj.getMonth()] + ', ' + currentDateObj.getFullYear();
    setCurrentDate(formattedDate);
  }

  function handlePeriodChange(period) {
    setSelectedPeriod(period);
    setShowFilter(false); 
  }
  function formatPeriod(period) {
    switch (period) {
      case 'today':
        return 'Today';
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      default:
        return period;
    }
  }

  return (
    <div className='board'>
      <div className='home-title-row b'>
        <h2>Welcome! {loginInfo.user.name}</h2>
        <p>{currentDate}</p>
      </div>
      <div className='board-main-row'>
        <h2>Board</h2>
        <div className='board-period' onClick={() => setShowFilter(!showFilter)}>
          <h4>{formatPeriod(selectedPeriod)}</h4>
          <img src={dropdown} alt='' ></img>
        </div>
        {showFilter && (
        <Filter
          text1={"today"}
          text2={"week"}
          text3={"month"}
          onSelectPeriod={handlePeriodChange}
        />
      )}
      </div>
      <div className='board-main-row sec'>
        <Section title={'Backlog'} data={backlogData} notify={notify}></Section>
        <Section title={'To Do'} data={todoData} handleAddCard={handleAddCard} notify={notify}></Section>
        <Section title={'In Progress'} data={progressData} notify={notify}></Section>
        <Section title={'Done'} data={doneData} notify={notify}></Section> 
      </div>
      
    </div>
  );
}

export default Board;