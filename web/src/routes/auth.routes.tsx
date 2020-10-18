import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';
import ChangePassword from '../pages/ChangePassword';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Verify from '../pages/Verify';

const AuthRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/verify' component={Verify}/>
      <Route path='/forgot-password' component={ForgotPassword}/>
      <Route path='/change-password' component={ChangePassword}/>
    </BrowserRouter>
  );
}

export default AuthRoutes;