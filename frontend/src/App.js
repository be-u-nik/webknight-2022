import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Auth />}></Route>
          <Route path="/rewards" element={<Rewards />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
