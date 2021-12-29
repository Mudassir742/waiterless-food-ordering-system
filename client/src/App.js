import React, { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./components/Admin/Admin";
import Customer from "./components/Customer/Customer";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Manager from "./components/Manager/Manager";
import Store from "./components/Customer/store/index";

import "./App.css";



function App() {
  const [role, setRole] = useState("");
  const [user, setUser] = useState({});

  return (
    <Provider store={Store}>
      <Router>
        <React.Fragment>
          {role.toLowerCase() === "admin" && (
            <Admin setRole={setRole} role={role} user={user} />
          )}
          {role.toLowerCase() === "customer" && (
            <Customer setRole={setRole} role={role} user={user} />
          )}
          {role.toLowerCase() === "manager" && (
            <Manager setRole={setRole} role={role} user={user} />
          )}
        </React.Fragment>
        <Routes>
          <Route
            path="/"
            element={<Login setRole={setRole} setUser={setUser} />}
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
