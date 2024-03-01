import React from 'react'
import logo from '../assets/logo/Art.png'
import '../styles/scene-styles/AuthForm.css'
import Login from '../components/auth-components/Login'
import Register from '../components/auth-components/Register'
import logoBack from '../assets/logo/Back.png';
import { useContext } from 'react';

function AuthForm({path}) {

  const handleLogin = async (formData) => {

    const payload = {
      email: formData.email,
      password: formData.password
    };
    console.log(payload);
    const url = `${process.env.REACT_APP_API_BASE_URL}/auth/login`;
    console.log(url);
    let loginResponse = await fetch(
      url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );
    return loginResponse;
    
  };

  // check later
  const handleRegister = async (formData) => {

    
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };
    console.log(payload);
    const url = `${process.env.REACT_APP_API_BASE_URL}/auth/register`;
    console.log(url);
    const savedUserResponse = await fetch(
      url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );
    const savedUser = await savedUserResponse.json();
    console.log(savedUser);
    
    if (savedUser) {
      return true;
    }
    else{
      return false;
    }
  };
  return (
    <div className='auth-main'>
        <div className='main-left'>      
            <img src={logoBack} className="circle-image" alt="circle"></img>
            <img src={logo} className="character-image" alt="character"></img>
            <div className='auth-text'>
                <h1>Welcome aboard my friend</h1>
                <p>just a couple of clicks and we start</p>
            </div>
            
        </div>
        <div className='main-right'>
        {path === '/login' && <Login handleLogin={handleLogin} />}
        {path === '/register' && <Register handleRegister={handleRegister} />}
            
        </div>
      
    </div>
  )
}

export default AuthForm
