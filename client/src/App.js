import { useState } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./components/Admin/Admin";
import Customer from "./components/Customer/Customer";
import Login from "./components/auth/Login";
import ReviewOrder from "./components/Customer/screens/RviewOrder";
import Signup from "./components/auth/Signup";

import Store from "./components/Customer/store/index";

import "./App.css";

function App() {
  const [role, setRole] = useState("");

  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login setRole={setRole} />} />
          <Route path="/signup" element={<Signup />} />

          {/* <Route path="/admin" element={<Admin />} />
          <Route path="/customer" element={<Customer />} /> */}
        </Routes>
      </Router>
      {role.toLowerCase() === "customer" && <Customer />}
      {role.toLowerCase() === "admin" && <Admin />}
    </Provider>
  );
}

export default App;
