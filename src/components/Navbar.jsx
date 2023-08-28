import React from "react";
import "../styles/Navbar.scss";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <nav className="navbar-container">
        <img src='../assets/logo.svg' alt="Logo" />
        <NavLink to='/about'>How to use</NavLink>
        <NavLink to='/'>Converter</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
