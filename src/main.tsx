import React from 'react';
import ReactDOM from 'react-dom';

import { Provider as JotaiGlobalStateProvider } from 'jotai';

import App from './components/App';

ReactDOM.render(
  <JotaiGlobalStateProvider>
    <App />
  </JotaiGlobalStateProvider>,
  document.getElementById('root')
);