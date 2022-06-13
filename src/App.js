import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';

import { Header } from './components';
import { Home, Cart, NotFoundPage } from './pages';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <SearchContext.Provider value={(searchValue, setSearchValue)}>
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
    </SearchContext.Provider>
  );
}

export default App;
