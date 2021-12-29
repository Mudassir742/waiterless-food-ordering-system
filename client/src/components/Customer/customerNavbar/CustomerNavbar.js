import React, { useState, useEffect } from "react";
import { NavLink,Link } from "react-router-dom";
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
    console.log("clicked")
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
      <div className="admin-profile">
        <div className="admin-pic"></div>
        <h3>{props.user.name}</h3>
        <div style={{color:"white"}}>
          <Link to="/customerprofile">Profile</Link>
          <div onClick={logout}>Logout</div>
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
