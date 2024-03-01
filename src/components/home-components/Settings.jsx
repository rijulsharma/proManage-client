import React from 'react'
import '../../styles/component-styles/Settings.css'
import Field from '../widgets/Field'
import user from '../../assets/icons/user.png'
import lock from '../../assets/icons/lock.png'
import view from '../../assets/icons/view.png'
import '../../styles/component-styles/Form.css'

import { useState, useContext, useEffect } from 'react'
import { LoginContext } from '../../util/contexts/LoginContexts'

function Settings() {

  const { loginInfo, setLoginInfo } = useContext(LoginContext);

  const handleUserUpdate =  async (formData) => {

    const payload = {
        name: formData.name,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        _id: loginInfo.user._id
    };

    const url = `${process.env.REACT_APP_API_BASE_URL}/profile/update`;
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
    return response;
  };
  
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError("");
    setNewPasswordError("");
    setSuccessMessage("");

    console.log(newPassword);
    if(newPassword){
      console.log("new pass hit");
      if (!oldPassword) {
        setNewPasswordError('Please enter current password');
        return;
      }
  
      if (newPassword.length < 6) {
        setNewPasswordError('New password must contain at least 6 characters.');
        return;
      } 
      if (!/\d/.test(newPassword) || !/[!@#$%^&*]/.test(newPassword)) {
        setNewPasswordError('New password must contain at least one numeric and one special character.');
        return;
      }
      if (newPassword === oldPassword) {
        setNewPasswordError("New password cant be same as old password");
        return;
      }
    }
    else{
      if( name === ''){
        setNameError('Name cannot be empty');
        return;
      }
    }

    if (name && (/[^a-zA-Z\s]/.test(name))) {
      setNameError('Name cant have numbers or special characters');
      return;
    }
    if( /(^\s)|(\s$)/.test(name) ){
      setNameError('Name cannto start or end with spaces');
      return;
    }

    const response = await handleUserUpdate({ name, oldPassword, newPassword });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setSuccessMessage(data.msg);
      setLoginInfo(loginInfo => ({
        ...loginInfo,
        user: data.user,
      }));
      console.log(data.user);
      localStorage.setItem('LoginInfo', JSON.stringify({user: data.user, token: loginInfo.token}));
      console.log("my melo");
    } else {
      setNewPasswordError('Old password entered is incorrect');
    }
  };

  useEffect(() => {
    setName(loginInfo.user.name);
  }, []);
  
  
  return  (
    <div className='settings'>
      <div className='home-title-row'>
        <h1>Settings</h1>
      </div>
      <div className='settings-content'>
        <form onSubmit={handleSubmit} noValidate>
          <Field
            icon={user}
            placeholder={'Name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="error-message">{nameError}</p>}
          <Field
            icon={lock}
            placeholder={'Old Password'}
            view={view}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            type={"password"}
          />
          <Field 
            icon={lock}
            placeholder={'New Password'}
            type={"password"}
            view={view}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {newPasswordError && <p className="error-message">{newPasswordError}</p>}
          {successMessage && <p className="error-message main success">{successMessage}</p>}
          <button type="submit" className='reg-button login'>Update</button>
        </form>
      </div>
    </div>
  ) ;
}

export default Settings
