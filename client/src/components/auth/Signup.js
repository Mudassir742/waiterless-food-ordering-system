import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  //storing the user detail for signUp....
  const [user, setUser] = useState({
    name: "",
    userName: "",
    password: "",
    contact: "",
    address: "",
  });

  //get data from input fields....
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  console.log(user);

  const register = async (e) => {
    e.preventDefault();

    try {
      //if all the inputs are filled up...
      if (
        user.userName &&
        user.password &&
        user.name &&
        user.address &&
        user.contact
      ) {
        const isLogin = await fetch("/customer/newcustomer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
          }),
        });

        const data = await isLogin.json();
        console.log(data);
        if (data.message === "register") {
          toast.success("Registeration Successfull");
          navigate("/")
          console.log("User not found");
        } else {
          toast.error("Unable to register");
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="login-outer-section">
      <section className="login-inner-section">
        <div className="login-content">
          <div className="login-logo">
            <h1>SignUp</h1>
            <button onClick={()=>navigate("/")}>Already a User</button>
          </div>
          <section className="login-input-section">
            <form className="login-form">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
              />
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                name="userName"
                id="userName"
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
              />
              <label htmlFor="contact">contact</label>
              <input
                type="text"
                name="contact"
                id="contact"
                onChange={handleChange}
              />
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={handleChange}
              />

              <button onClick={register}>Register</button>
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

export default Signup;
