import React from "react";
import { Route, Routes } from "react-router-dom";
import Coder from "../pages/Coder";
import About from "../pages/About";

const RoutesC = () => {
  return (
    <Routes>
      <Route path="/" element={<Coder />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Coder />} />
    </Routes>
  );
};

export default RoutesC;
