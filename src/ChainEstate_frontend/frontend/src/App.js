import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import RegisterLand from './pages/RegisterLand';
import ViewLands from './pages/ViewLands';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterLand />} />
        <Route path="/view" element={<ViewLands />} />
      </Routes>
    </Router>
  );
}

export default App;
