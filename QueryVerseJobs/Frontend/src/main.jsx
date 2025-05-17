import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  
  <Auth0Provider
    domain="dev-4hg3hzvf1snsoyz2.us.auth0.com"
    clientId="dboO5V1NTvNXwKb9nobopfNrMgtVnaQ2"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
   <BrowserRouter>
        <App />
      </BrowserRouter>
  </Auth0Provider>,
      
)
