import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider as JotaiGlobalStateProvider } from 'jotai';

import App from './components/App';

import './main.css';

const domNode = document.getElementById('root') as Element | DocumentFragment;
const root = ReactDOM.createRoot(domNode);

root.render(
  <JotaiGlobalStateProvider>
    <App />
  </JotaiGlobalStateProvider>
);