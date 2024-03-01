import React from 'react'
import Card from '../components/widgets/Card'
import '../styles/scene-styles/SharePage.css'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string';
import sharelogo from '../assets/logo/codesandbox.png'
import { useState, useEffect } from 'react';

function SharePage() {

  const location = useLocation();
  const {shareId} = queryString.parse(location.search);
  const [data, setData ] = useState(null);

  useEffect(() => {
    const updateSection = async () => {
      try{
        const url = `${process.env.REACT_APP_API_BASE_URL}/shared/${shareId}`;
        let response = await fetch( url, {
          method: "GET"
        });
        if(response.ok){
          response = await response.json();
          setData(response)
          console.log(response);
        }
        else{
          console.log(`could not find shared data`);
        }
      }catch(err){
        console.log(`shared error`);
      }
    }
    updateSection()

  }, []); 


  return (

    <div className='sharePage'> 
      <div className='share-logo'><img src={sharelogo} alt='logo'></img> <p>Pro Manage</p></div>
      <div className='shareCard'>
      { data && < Card className = "card share" item={data[0]} isShare= {true} />}
      </div>
    </div>
  )
}

export default SharePage
