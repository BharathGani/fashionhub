// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the root element for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component
const renderApp = () => {
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
};

// Initial rendering
renderApp();

// Optional: Measure performance in your app
const reportPerformance = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        reportWebVitals(onPerfEntry);
    }
};

// Export reportPerformance for potential use in other parts of the app
export { reportPerformance };

// reportWebVitals function can be used to log results or send to an analytics endpoint
reportWebVitals(console.log);