import React from 'react'
import Field from '../widgets/Field'
import mail from '../../assets/icons/email.png'
import lock from '../../assets/icons/lock.png'
import view from '../../assets/icons/view.png'
import '../../styles/component-styles/Error.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react'
import { LoginContext } from  '../../util/contexts/LoginContexts'

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginInfo, setLoginInfo } = useContext(LoginContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');

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
    
    let loginResponse = await handleLogin({ email, password });
    console.log(loginResponse);
    if (loginResponse.ok) {
      loginResponse = await loginResponse.json();
      localStorage.setItem('LoginInfo', JSON.stringify({user: loginResponse.user, token: loginResponse.token}));
      setLoginInfo({
        user: loginResponse.user,
        token: loginResponse.token
      });
    } else {
      setError('Invalid email or password.');
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem('LoginInfo');
    if (localToken) {
      let token = JSON.parse(localToken);
      setLoginInfo(token);
    }
    if( loginInfo ){
      navigate("/");
    }
  }, [loginInfo]);

  return (
    <div>
      <div className='form'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} noValidate>
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
            onChange={(e) => setPassword(e.target.value)}
            view={view}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          <button type="submit" className='reg-button login'>Login</button>
        </form>
        <p>Have no account yet?</p>
        
        <Link to="/register" className='reg-button'>Register</Link>
      </div>
      {error && <p className="error-message main">{error}</p>}
    </div>
  );
}

export default Login;
