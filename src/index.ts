import { createRoot } from 'react-dom/client';
import { Header } from './components/header/index.js';

const node = document.getElementById('root');
if (!node) throw new Error('You forgot to add root node to index.html');
const root = createRoot(node);
root.render(Header());
