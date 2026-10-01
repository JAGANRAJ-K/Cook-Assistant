import React from 'react'
import ReactDOM from 'react-dom/client' 
import App from './App'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import RecipeProvider from './context/RecipeContext';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RecipeProvider>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
    </RecipeProvider>
  </React.StrictMode>
)
