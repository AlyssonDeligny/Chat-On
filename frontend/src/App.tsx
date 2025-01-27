import React, { useEffect, useState } from 'react';
import './styles/App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// @ts-ignore
import HomePage from "./pages/HomePage.tsx";
// @ts-ignore
import Chat from "./pages/Chat.tsx";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;