import React, { Suspense } from 'react';
import ReactDOM from 'react-dom'
import './i18n'

import App from './App';

require('dotenv').config();

// console.log(process.env)

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);