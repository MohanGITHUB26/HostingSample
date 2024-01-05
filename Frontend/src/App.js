import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

// pages

import Register from './pages/register';
import Login from './pages/login';
// import Router
import ConditionRoute from './Routes/ConditionRoute';






function App() {

  return (
    <div className="App">
      <BrowserRouter basename='/login'>
        <Routes>
          <Route path='/register' element={
            <ConditionRoute type="auth">
              <Register />
            </ConditionRoute>}
          />
          <Route path='/login' element={
            <ConditionRoute type="auth">
              <Login />
            </ConditionRoute>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
