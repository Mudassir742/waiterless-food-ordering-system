import React, { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const CustomerProfile = (props) => {
  //storing the user detail for signUp....
  const [user, setUser] = useState({
    name: "",
    userName: "",
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
          if (
            user.userName &&
            user.name &&
            user.address &&
            user.contact
          ) {
            const isLogin = await fetch("/customer/updatecustomer", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...user,customerID:props.user.customerID
              }),
            });
    
            const data = await isLogin.json();
            console.log(data);
            if (data.message === "updated") {
                props.setRole("")
                navigate("/")
              console.log("updated")
            } else {
              console.log("Unable to update")
            }
          }
          else{
            console.log("fields should not be empty");
          }
        } catch (err) {
          console.log(err.message);
        }
    };


  useLayoutEffect(() => {
    setUser({
      name: props.user.name,
      userName: props.user.username,
      contact: props.user.contact,
      address: props.user.address,
    });
  }, [
    props.user.name,
    props.user.username,
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
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={user.userName}
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
    </div>
  );
};

export default CustomerProfile;
