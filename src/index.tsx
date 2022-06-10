import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { darkTheme, lightTheme } from './theme';
import { ThemeProvider } from 'styled-components';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);