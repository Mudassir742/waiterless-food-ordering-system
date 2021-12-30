import React, { useState, useLayoutEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const CustomerProfile = (props) => {
  //storing the user detail for signUp....
  const [user, setUser] = useState({
    name: "",
    userName:"",
    password:"",
    contact: "",
    address: "",
  });

  const navigate = useNavigate();

  //get data from input fields....
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      //if all the inputs are filled up...
      if (user.name && user.address && user.contact) {
        if (
          user.contact.match(/^[0-9]+$/) !== null &&
          user.contact.length === 11
        ) {
          const isLogin = await fetch("/customer/updatecustomer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...user,
              customerID: props.user.customerID,
            }),
          });

          const data = await isLogin.json();
          console.log(data);
          if (data.message === "updated") {
            props.setRole("");
            navigate("/");
            console.log("updated");
          } else {
            toast.error("Update Error!!!!");
          }
        } else {
          toast.error("Enter Proper Contact");
        }
      } else {
        toast.error("Fields Should not be empty!");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useLayoutEffect(() => {
    setUser({
      name: props.user.name,
      userName:props.user.userName,
      password: props.user.password,
      contact: props.user.contact,
      address: props.user.address,
    });
  }, [
    props.user.name,
    props.user.userName,
    props.user.password,
    props.user.contact,
    props.user.address,
  ]);

  return (
    <div className="login-outer-section">
      <section className="login-inner-section">
        <div className="login-content">
          <div className="login-logo">
            <h1>User Detail</h1>
          </div>
          <section className="login-input-section">
            <form className="login-form">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                value={user.password}
                onChange={handleChange}
              />

              <label htmlFor="contact">contact</label>
              <input
                type="text"
                name="contact"
                id="contact"
                value={user.contact}
                onChange={handleChange}
              />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                value={user.address}
                onChange={handleChange}
              />

              <button onClick={register}>Update</button>
            </form>
          </section>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CustomerProfile;
