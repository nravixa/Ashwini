import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import ErrorBoundary, { RootErrorFallback } from './components/ErrorBoundary.tsx';
import './styles/globals.css';
import "maplibre-gl/dist/maplibre-gl.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<RootErrorFallback />}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
);
