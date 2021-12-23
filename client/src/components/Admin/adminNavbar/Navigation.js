import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation-container">
      <h1 className="logo">Logo</h1>
      <nav className="nav-links">
        <NavLink to="/admin" className="links">
          Home
        </NavLink>
        <NavLink to="/adminmenu" className="links">
          Menu
        </NavLink>
        <NavLink to="/admincustomer" className="links">
          Customer
        </NavLink>
        <NavLink to="/adminemploy" className="links">
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
