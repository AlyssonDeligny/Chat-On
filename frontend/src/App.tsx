import React, { useEffect, useState } from 'react';
import './styles/App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// @ts-ignore
import HomePage from "./pages/HomePage.tsx";
// @ts-ignore
import Chat from "./pages/Chat.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;