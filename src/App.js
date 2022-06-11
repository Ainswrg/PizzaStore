import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';

import { Header } from './components';
import { Home, Cart, NotFoundPage } from './pages';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
