import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import { VideoIdProvider } from './Context.tsx';

ReactDOM.render(
  <React.StrictMode>
    <VideoIdProvider>
    <App />
    </VideoIdProvider>
  </React.StrictMode>,
  document.getElementById('root')
);