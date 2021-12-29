import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const CustomerNavbar = (props) => {
  const [cartQauntity, setCartQunatity] = useState(0);


  useEffect(() => {
    let count = 0;
    for (let i = 0; i < props.cartItem.length; i++) {
      count = count + props.cartItem[i].itemQuantity;
    }
    //console.log(count)
    setCartQunatity(count);
  }, [props.cartItem]);

  const navigate = useNavigate();

  const logout = (e) => {
    props.setRole("");
    navigate("/");
  };

  return (
    <div className="navigation-container">
      <h1 className="logo">Logo</h1>
      <nav className="nav-links">
        <NavLink to="/customer" className="links">
          Menu
        </NavLink>
      </nav>
      <Link to="/customercart">
        <div className="navabar-right-column">
          <i className="fa fa-shopping-cart"></i>
          <span>{cartQauntity}</span>
        </div>
      </Link>
      <Link
        to="/customerprofile"
        className="admin-profile"
      >
        <div className="admin-pic"></div>
        <h3>{props.user.name}</h3>
      </Link>

      <div style={{ color: "white" }} className="user-menu">
        <NavLink to="/customerorderhistory" className="list-items">
          Order History
        </NavLink>
        <div onClick={logout} className="list-items">
          Logout
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItem: state,
  };
};

export default connect(mapStateToProps)(CustomerNavbar);
