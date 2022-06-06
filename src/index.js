import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';

const root = ReactDOM.createRoot(document.getElementById('root'));

const darkTheme = {
  textColor:"whitesmoke",
  backgroundColor:"#111",
}
const lightTheme = {
  textColor:"#111",
  backgroundColor:"whitesmoke",
}

// 큰 회사라면 textColor, borderColor, lInkColor, HoverColor 등등 다양

root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>
);