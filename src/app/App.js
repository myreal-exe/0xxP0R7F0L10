import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import NavBar from '../components/NavBar/NavBar.js';
import HomePage from "../pages/homepage/homepage.js";
import Prxjects from '../pages/prxjects/prxjects.js';
import AboutMe from '../pages/aboutMe/aboutMe.js';
import Cont4cts from '../pages/cont4cts/contacts.js';

import './App.css';

function App() {
  // State
  //// Rendering Conditionals
  const [ entered, setEntered ] = useState(false);

  // Handlers
  //// entered Handle
  const handleEnterClick = (e) => {
    e.preventDefault()
    setEntered(true);
  }

  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<HomePage entered={entered} onEnterClick={handleEnterClick}/>}/>
        <Route path="/prxjects" element={<Prxjects/>}/>
        <Route path="/4bout_me" element={<AboutMe/>}/>
        <Route path="/cont4cts" element={<Cont4cts/>}/>
      </Routes>
    </Router>
  );
}

export default App;
