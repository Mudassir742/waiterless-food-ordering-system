import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ManagerNavbar = (props) => {
  const navigate = useNavigate();

  const logout = (e) => {
    props.setRole("");
    navigate("/");
  };

  return (
    <div className="navigation-container">
      <h1 className="logo">Logo</h1>
      <nav className="nav-links">
        <NavLink to="/orderhistory" className="links">
          Current Orders
        </NavLink>
        <NavLink to="/finishedorders" className="links">
          Completed Orders
        </NavLink>
      </nav>
      <Link to="/customerprofile" className="admin-profile">
        <div className="admin-pic"></div>
        <h3>{props.user.name}</h3>
      </Link>

      <div style={{ color: "white" }} className="user-menu">
        <div onClick={logout} className="list-items">
          Logout
        </div>
      </div>
    </div>
  );
};

export default ManagerNavbar;
