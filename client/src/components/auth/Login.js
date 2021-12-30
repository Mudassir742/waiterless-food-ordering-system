import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const navigate = useNavigate();

  //storing the user detail for signUp....
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  //get data from input fields....
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  console.log(user);

  const login = async (e) => {
    e.preventDefault();

    const { userName, password } = user;

    try {
      //if all the inputs are filled up...
      if (userName && password) {
        const isLogin = await fetch("/auth/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            password,
          }),
        });

        const data = await isLogin.json();
        console.log(data.data);
        if (data.message === "user not found") {
          toast.error("User not found");
          console.log("User not found");
        } else {
          if (data.data[0].employRole.toLowerCase() === "admin") {
            props.setRole("admin");
            props.setUser(data.data[0]);
            navigate("/admin");
          } else if (data.data[0].employRole.toLowerCase() === "customer") {
            props.setRole("customer");
            props.setUser(data.data[0]);
            navigate("/customer");
          } else if (data.data[0].employRole.toLowerCase() === "manager") {
            props.setRole("manager");
            props.setUser(data.data[0]);
            navigate("/orderhistory");
          }
          //{data.data.employRole ? (data.data.employRole.toLowerCase() === "admin" ? props.setRole("admin"): props.setRole("manager")) : props.setRole("customer")}
          toast.error("Login error!");
        }
      } else {
        toast.error("Fields are not properly filled!");
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
            <h1>Log In</h1>
            <button onClick={() => navigate("/signup")}>
              Don't have an account? Sign Up
            </button>
          </div>
          <div className="login-line"></div>
          <section className="login-input-section">
            <form className="login-form">
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
              <div className="remember">
                <p>Forgot Password</p>
              </div>

              <button onClick={login}>LOG IN</button>
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

export default Login;
