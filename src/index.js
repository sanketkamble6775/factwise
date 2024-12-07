import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css'
import { One } from './components/One';

const App = () => (
  <One />
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);