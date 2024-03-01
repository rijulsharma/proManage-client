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

function Register({ handleRegister }) {
 
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setError('');

    if (!name) {
      setError('Please enter your name.');
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

    const success = handleRegister({ name, email, password });
    if (success) {
      navigate("/");
    } else {
      setError('Something went wrong.');
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
          {error && <p className="error-message">{error}</p>}
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
    </div>
  );
}

export default Register;