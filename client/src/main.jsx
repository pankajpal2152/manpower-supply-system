import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 1. Global CSS Imports
// Import Bootstrap globally so all components can use its grid and utility classes
import 'bootstrap/dist/css/bootstrap.min.css'; 
// Import your custom global styles
import './index.css'; 

// 2. Main Application Import
import App from './App.jsx';

// 3. Mount the React application to the DOM
const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Failed to find the root element. Check your index.html file.");
}