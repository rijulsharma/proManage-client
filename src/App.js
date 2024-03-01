import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import AuthForm from './scenes/AuthForm';
import Home from './scenes/Home';
import { LoginContext } from "./util/contexts/LoginContexts"
import { useState } from 'react';
import { CardDetailsProvider } from './util/contexts/CardDetailsContext';
import { PopupProvider } from './util/contexts/PopupContext';
import SharePage from './scenes/SharePage';

function App() {

  const [loginInfo, setLoginInfo] = useState(null);
  return (
    <LoginContext.Provider value={{ loginInfo, setLoginInfo}} >
      <CardDetailsProvider>
        <PopupProvider>
            <Router>
              <Routes> 
                <Route exact path="/login" element={ loginInfo ? <Navigate to="/" /> : <AuthForm path={'/login'} /> } />
                <Route exact path="/register" element={ loginInfo ? <Navigate to="/" /> : <AuthForm path={'/register'} /> } />
                <Route exact path='/share' element={ <SharePage/>}></Route>
                <Route exact path="/*" element={ loginInfo ? <Home/> : <Navigate to="/login" /> } />
              </Routes>
            </Router>          
        </PopupProvider>
      </CardDetailsProvider>
    </LoginContext.Provider> 
  );
}

export default App;
