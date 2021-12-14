import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation-container">
      <h1 className="logo">Logo</h1>
      <nav className="nav-links">
        <NavLink to="/" className="links">
          Home
        </NavLink>
        <NavLink to="/menu" className="links">
          Menu
        </NavLink>
        <NavLink to="/customer" className="links">
          Customer
        </NavLink>
        <NavLink to="/employ" className="links">
          Employ
        </NavLink>
      </nav>
      <div className="admin-profile">
        <div className="admin-pic"></div>
        <h3>Admin</h3>
      </div>
    </div>
  );
};

export default Navigation;
