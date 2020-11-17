import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ForgotPassword from '../pages/ForgotPassword';
import ChangePassword from '../pages/ChangePassword';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Verify from '../pages/Verify';
import PrivacyPolicy from '../components/PrivacyPolicy';

const AuthRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Register}/>
      <Route path='/login' component={Login}/>
      <Route path='/verify' component={Verify}/>
      <Route path='/forgot-password' component={ForgotPassword}/>
      <Route path='/change-password' component={ChangePassword}/>
      <Route path='/privacy-policy' component={PrivacyPolicy}/>
    </BrowserRouter>
  );
}

export default AuthRoutes;