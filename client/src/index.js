import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import CreatePost from './components/CreatePost';
import ListPosts from './components/ListPosts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CreatePost />
    <ListPosts/>
  </React.StrictMode>
);
reportWebVitals();
