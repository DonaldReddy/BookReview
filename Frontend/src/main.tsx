import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App.tsx';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // Replace with your actual client ID
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const theme = localStorage.getItem('theme');
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
    <ToastContainer position="top-right" autoClose={3000} />
  </StrictMode>,
);
