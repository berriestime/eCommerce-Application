import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { apiRootAnonymous } from './lib/commerstools/create-anonymous-client';
import { apiRootLogin } from './lib/commerstools/create-password-client';
import { apiRootRefresh } from './lib/commerstools/create-refresh-client';
import { defineApiRoot } from './lib/commerstools/define-client';

import './index.css';

const node = document.getElementById('root');
if (!node) {
  throw new Error('You forgot to add root node to index.html');
}

defineApiRoot({ apiRootAnonymous, apiRootLogin, apiRootRefresh });

const root = createRoot(node);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
