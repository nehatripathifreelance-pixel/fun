
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("App initializing...");

// Global error handler to catch runtime errors
window.onerror = (message, source, lineno, colno, error) => {
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '0';
  errorDiv.style.left = '0';
  errorDiv.style.width = '100%';
  errorDiv.style.background = 'red';
  errorDiv.style.color = 'white';
  errorDiv.style.padding = '20px';
  errorDiv.style.zIndex = '9999';
  errorDiv.innerHTML = `
    <h1 style="font-size: 20px; font-weight: bold;">Runtime Error:</h1>
    <p>${message}</p>
    <p>Source: ${source}:${lineno}:${colno}</p>
    <pre style="background: rgba(0,0,0,0.2); padding: 10px; margin-top: 10px; border-radius: 5px;">${error?.stack || 'No stack trace available'}</pre>
  `;
  document.body.appendChild(errorDiv);
  return false;
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Root element not found!");
  throw new Error("Could not find root element to mount to");
}

console.log("Root element found, rendering...");

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log("Render call completed.");
