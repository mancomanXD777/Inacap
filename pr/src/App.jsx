import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={home} />
      <Route path="/contacto" element={contacto} />
    </Routes>
    </BrowserRouter>
)
}
export default App
