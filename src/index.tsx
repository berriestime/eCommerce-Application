import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { createRefreshFlowClient } from './lib/commerstools/create-refresh-client';
import { getRefreshToken } from './lib/commerstools/token-cache';

import './index.css';

const node = document.getElementById('root');
if (!node) {
  throw new Error('You forgot to add root node to index.html');
}

const isRefresh = getRefreshToken();
if (isRefresh) {
  createRefreshFlowClient();
}

const root = createRoot(node);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
