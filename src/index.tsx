import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';


const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);