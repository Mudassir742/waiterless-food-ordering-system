import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navigation = (props) => {

  const navigate = useNavigate();

  const logout = (e) => {
    props.setRole("");
    console.log("clicked")
    navigate("/");
  };
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
        <h3>{props.user.name}</h3>
        <div style={{color:"white"}}>
          <div>Profile</div>
          <div onClick={logout}>Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;