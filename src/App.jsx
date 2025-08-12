import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ClassPeriod from "./pages/ClassPeriod";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/class/:period" element={<ClassPeriod />} />
      </Routes>
    </Router>
  );
}
