import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import { TokenContextProvider } from './share/TokenContext.tsx'; 



ReactDOM.render(
  <React.StrictMode> 
    <TokenContextProvider>
    <App />
    </TokenContextProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);
