import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import { router } from './routes/routes.jsx';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router';
import AuthProvider from './context/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
    <RouterProvider router = {router} />
    <ToastContainer />
  </AuthProvider>

  </StrictMode>,
)
