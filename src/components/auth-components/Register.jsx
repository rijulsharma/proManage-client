import React from 'react'
import Field from '../widgets/Field'
import '../../styles/component-styles/Form.css'
import user from '../../assets/icons/user.png'
import mail from '../../assets/icons/email.png'
import lock from '../../assets/icons/lock.png'
import view from '../../assets/icons/view.png'
import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/component-styles/Error.css'

function Register() {
 
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [error, setError] = useState('');


  const handleRegister = async (formData) => {

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };
    const url = `${process.env.REACT_APP_API_BASE_URL}/auth/register`;
    const savedUserResponse = await fetch(
      url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );
    return savedUserResponse;

  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setNameError('');

    if (!name) {
      setNameError('Please enter your name.');
      return;
    }

    if (/[^a-zA-Z\s]/.test(name)) {
      setNameError('Name cant have numbers or special characters');
      return;
    }
    if( /(^\s)|(\s$)/.test(name) ){
      setNameError('Name cannto start or end with spaces');
      return;
    }

    if (!email) {
      setEmailError('Please enter your email.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format.');
      return;
    }

    if (!password) {
      setPasswordError('Please enter your password.');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must contain at least 6 characters.');
      return;
    } 
    if (!/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      setPasswordError('Password must contain at least one numeric and one special character.');
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm password.');
      return;
    }
    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords don't match.");
      return;
    }

    const savedUserResponse = await handleRegister({ name, email, password });
    if (savedUserResponse.ok) {
      navigate("/");
    } else {
      let response = await savedUserResponse.json();
      setError(response.msg);
    }
  };

  return (
    <div>
      <div className='form'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} noValidate>
          <Field
            icon={user}
            placeholder={'Name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="error-message">{nameError}</p>}
          <Field
            type="email"
            icon={mail}
            placeholder={'Email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <Field
            type="password"
            icon={lock}
            placeholder={'Password'}
            value={password}
            view={view}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          <Field
            type="password"
            icon={lock}
            placeholder={'Confirm Password'}
            value={confirmPassword}
            view={view}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
          <button type="submit" className='reg-button'>Register</button>
        </form>
        <p>Have an account?</p>
        <Link to="/login" className='reg-button login'>Login</Link>
      </div>
      {error && <p className="error-message main">{error}</p>}
    </div>
  );
}

export default Register;