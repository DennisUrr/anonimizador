// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setupPdfWorker } from './utils/pdfWorkerSetup';
import './index.css';

// Configurar el worker de PDF.js
setupPdfWorker();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);