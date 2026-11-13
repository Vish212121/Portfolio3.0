import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initializeTheme } from './theme/themeController.js';
import './styles/terminal.css';

initializeTheme();
createRoot(document.getElementById('root')).render(<App />);
