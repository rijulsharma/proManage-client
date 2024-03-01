
import '../../styles/component-styles/Filter.css';
import React, { useState,useEffect, useRef } from 'react';

function Filter({ text1, text2, text3, onSelectPeriod, notify }) {
  const [isOpen, setIsOpen] = useState(true); 
  const textStyle = text3 === 'Delete' ? { color: '#CF3636' } : {};
  const filterClassName = text3 === 'Delete' ? 'filter menu' : 'filter';
  const filterRef = useRef(null);

  const formatText = (text) => {
    switch (text) {
      case 'today':
        return 'Today';
      case 'week':
        return 'This week';
      case 'month':
        return 'This month';
      default:
        return text;
    }
  };

  const handleClickText2 = () => {
    const formattedText2 = formatText(text2);
    onSelectPeriod(text2);
    if (formattedText2 === 'Share') {
      notify();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
        console.log('Clicked outside the Filter component');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 

  if (!isOpen) {
    return null; 
  }

  return (
    <div className={filterClassName} ref={filterRef}>
      <p onClick={() => onSelectPeriod(text1)}>{formatText(text1)}</p>
      <p onClick={handleClickText2}>{formatText(text2)}</p>
      <p onClick={() => onSelectPeriod(text3)} style={textStyle}>{formatText(text3)}</p>
    </div>
  );
}

export default Filter;
