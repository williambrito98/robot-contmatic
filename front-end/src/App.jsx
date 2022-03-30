import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Schedule from "./components/Schedule";

function App() {

  const [token, setToken] = useState('')

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login setToken={setToken} />} />
        <Route path='/admin' element={<Dashboard token={token} />} />
        <Route path='/admin/schedule' element={<Schedule />} />
      </Routes>
    </Router>
  );
}

export default App;
