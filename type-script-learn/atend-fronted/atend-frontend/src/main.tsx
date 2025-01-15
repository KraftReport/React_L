import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import { TokenContextProvider } from './share/TokenContext.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId : string = '1069095628455-1uolcr1igmt45p9h0c4h61a7ksk7nkg7.apps.googleusercontent.com'


ReactDOM.render(
  <React.StrictMode>
       <GoogleOAuthProvider clientId={clientId}> 
    <TokenContextProvider>
    <App />
    </TokenContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
