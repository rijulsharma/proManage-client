import React from 'react'
import logo from '../assets/logo/Art.png'
import '../styles/scene-styles/AuthForm.css'
import Login from '../components/auth-components/Login'
import Register from '../components/auth-components/Register'
import logoBack from '../assets/logo/Back.png';
import { useContext } from 'react';

function AuthForm({path}) {

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
        {path === '/login' && <Login/>}
        {path === '/register' && <Register/>}
            
        </div>
      
    </div>
  )
}

export default AuthForm
