import React from 'react'
import { useState, useEffect, useContext } from 'react';
import '../../styles/component-styles/Analytics.css'
import { LoginContext } from '../../util/contexts/LoginContexts'
import point from '../../assets/icons/point.png'

function Analytics() {
  

  const { loginInfo } = useContext(LoginContext);
  const [analyticsData, setAnalyticsData] = useState({
    BacklogTasks: 0,
    ToDoTasks: 0,
    InProgressTasks: 0,
    CompletedTasks: 0,
    LowPriorityTasks: 0,
    MediumPriorityTasks: 0,
    HighPriorityTasks: 0,
    DueDateTasks: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const userId = loginInfo.user._id;
      const url = `${process.env.REACT_APP_API_BASE_URL}/analytics/${userId}`;
      const response = await fetch( url, {
        method: "GET",
        headers: { Authorization: `Bearer ${loginInfo.token}` },
      });
      const data = await response.json();
      setAnalyticsData(data);
    };
    if(loginInfo){
      fetchData();
    }
  }, [loginInfo]);
  
  if (!analyticsData) return null;

  return (
    <div className='analytics'>
      <div className='home-title-row'>
        <h1>Analytics</h1>
        <div className='an-content'>
          <div className='an-list'>
            <div className='an-list-row'>
              <div className='al-title'>
                <img src={point} alt='bl' />
                <p>Backlog Tasks</p>
              </div>
              <p className='count'>{analyticsData.BacklogTasks}</p>
            </div>
            <div className='an-list-row'>
              <div className='al-title'>
                <img src={point} alt='bl' />
                <p>To-do Tasks</p>
              </div>
              <p className='count'>{analyticsData.ToDoTasks}</p>
            </div>
            <div className='an-list-row'>
              <div className='al-title'>
                <img src={point} alt='bl' />
                <p>In-Progress Tasks</p>
              </div>
              <p className='count'>{analyticsData.InProgressTasks}</p>
            </div>
            <div className='an-list-row'>
              <div className='al-title'>
                <img src={point} alt='bl' />
                <p>Completed Tasks</p>
              </div>
              <p className='count'>{analyticsData.CompletedTasks}</p>
            </div>
          </div>
          <div className='an-list'>
            <div className='an-list-row'>
              <div className='al-title'>
                <img src={point} alt='bl' />
                <p>Low Priority</p>
              </div>
              <p className='count'>{analyticsData.LowPriorityTasks}</p>
            </div>
            <div className='an-list-row'>
              <div className='al-title'>
                <img src={point} alt='bl' />
                <p>Moderate Priority</p>
              </div>
              <p className='count'>{analyticsData.MediumPriorityTasks}</p>
            </div>
            <div className='an-list-row'>
              <div className='al-title'>
                <img src={point} alt='bl' />
                <p>High Priority</p>
              </div>
              <p className='count'>{analyticsData.HighPriorityTasks}</p>
            </div>
            <div className='an-list-row'>
              <div className='al-title'>
                <img src={point} alt='bl' />
                <p>Due Date Tasks</p>
              </div>
              <p className='count'>{analyticsData.DueDateTasks}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Analytics


// method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId: loggedInUserId }),
