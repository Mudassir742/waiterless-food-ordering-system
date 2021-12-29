import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./components/Admin/Admin";
import Customer from "./components/Customer/Customer";
import Login from "./components/auth/Login";
import ReviewOrder from "./components/Customer/screens/RviewOrder";
import Signup from "./components/auth/Signup";

import Store from "./components/Customer/store/index";

import "./App.css";
import Manager from "./components/Manager/Manager";

function App() {
  const [role, setRole] = useState("");
  const [user,setUser] = useState({})
  console.log(user)

  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login setRole={setRole} setUser={setUser}/>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <React.Fragment>
          {role.toLowerCase() === "admin" && <Admin setRole={setRole} user={user}/>}
          {role.toLowerCase() === "customer" && <Customer setRole={setRole} user={user}/>}
          {role.toLowerCase() === "manager" && <Manager setRole={setRole} user={user}/>}
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
