import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import NotVerified from '../pages/NotVerified';
import TradeList from '../pages/TradeList';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      { user?.verified ? (
        <Route path='/' component={TradeList} />
      ) : (
          <Route path='/' component={NotVerified} />
        )
      }
    </BrowserRouter>
  );
}

export default AppRoutes;