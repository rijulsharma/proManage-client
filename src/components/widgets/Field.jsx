import React from 'react';
import '../../styles/component-styles/Field.css';
import { useState } from 'react';
function Field({ icon, view, type, placeholder,value,onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className='field'>
      <img className='field-icon' src={icon} alt='icon' />
      <input
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <img
        className='field-view'
        src={view}
        alt=''
        onClick={togglePasswordVisibility} 
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
}

export default Field;
