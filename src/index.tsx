import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Header } from './components/header/header.js';

const node = document.getElementById('root');
if (!node) {
  throw new Error('You forgot to add root node to index.html');
}
const root = createRoot(node);
root.render(
  <StrictMode>
    <Header />
  </StrictMode>,
);
