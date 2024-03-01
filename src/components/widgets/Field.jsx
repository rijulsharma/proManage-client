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
        type={showPassword ? 'text' : type} // Toggle input type between 'text' and 'password'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <img
        className='field-view'
        src={view}
        alt=''
        onClick={togglePasswordVisibility} // Call togglePasswordVisibility function on click
        style={{ cursor: 'pointer' }} // Ensure the cursor changes on hover
      />
    </div>
  );
}

export default Field;
