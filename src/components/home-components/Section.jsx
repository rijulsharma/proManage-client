import React, { useState } from 'react'
import '../../styles/component-styles/Section.css'
import add from '../../assets/icons/add.png'
import collapse from '../../assets/icons/collapse-all.png'
import Card from '../widgets/Card'


function Section({title, data, handleAddCard,notify}) {
  const [collapseAll, setCollapseAll] = useState(false);
  const handleCollapseAll = () =>{
    
    setCollapseAll(true);
  }
  
  return (
    <div className='section'>
      <div className='section-row'>
        <p>{title}</p>
        <div className='section-icons'>
        {title === 'To Do' && (
            <img src={add} alt='add' className='section-icon-add' onClick={handleAddCard} />
          )}
        <img src={collapse} alt='collapse' onClick={handleCollapseAll}></img>
        </div>
      </div>
      {data.map((item) => (
        <div className='section-row'>
          <Card item={item} collapseAll={collapseAll} setCollapseAll={setCollapseAll} isShare={false} notify={notify} />
        </div>
      ))}
    </div>
  )
}

export default Section
