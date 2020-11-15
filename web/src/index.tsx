import React, { Suspense } from 'react';
import ReactDOM from 'react-dom'
import './i18n'

import App from './App';
import Loading from './pages/Loading';

require('dotenv').config();

// console.log(process.env)

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={Loading}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);