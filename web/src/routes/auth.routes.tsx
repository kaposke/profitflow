import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Verify from '../pages/Verify';

const AuthRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/verify' component={Verify}/>
    </BrowserRouter>
  );
}

export default AuthRoutes;