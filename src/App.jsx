import React from "react";
import Trans from "./Trans";
import Login from "./components/Login";
import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useTodos } from './contexts/AppContext'

function App() {
  const { isLogedIn } = useTodos()

  return (
      <Router>
        <Routes>
          <Route path="/" element={isLogedIn?<Trans />: <Navigate replace to='/login' />} />
          <Route path="/login" element={isLogedIn?<Navigate replace to='/' />:<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
