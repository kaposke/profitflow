import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import TradeList from '../pages/TradeList';

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path='/' component={TradeList}/>
    </BrowserRouter>
  );
}

export default AppRoutes;