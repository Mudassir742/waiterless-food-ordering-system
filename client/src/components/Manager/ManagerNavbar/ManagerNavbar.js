import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ManagerNavbar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logout = (e) => {
    props.setRole("");
    console.log("clicked");
    navigate("/");
  };

  return (
    <div className="navigation-container">
      <h1 className="logo">Logo</h1>
      <nav className="nav-links">
        <NavLink to="/orderhistory" className="links">
          Orders
        </NavLink>
      </nav>
      <div className="admin-profile" onClick={(e) => setShowMenu(!showMenu)}>
        <div className="admin-pic"></div>
        <h3>{props.user.name}</h3>
        <div style={{ color: "white" }}>
          <div>Profile</div>
          <div onClick={logout}>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default ManagerNavbar;
