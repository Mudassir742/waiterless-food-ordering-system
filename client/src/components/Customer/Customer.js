import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomerMenu from "./screens/CustomerMenu";
import CustomerNavbar from "./customerNavbar/CustomerNavbar";
import Cart from "./screens/Cart";
import ReviewOrder from "./screens/RviewOrder";
import CustomerProfile from "./screens/CustomerProfile";

const Customer = ({setRole,user}) => {
  return (
    <>
      <CustomerNavbar setRole={setRole} user={user}/>
      <Routes>
        <Route path="/customer" element={<CustomerMenu />} />
        <Route path="/customercart" element={<Cart />} />
        <Route path="/revieworder" element={<ReviewOrder />} />
        <Route path="/customerprofile" element={<CustomerProfile user={user} setRole={setRole}/>} />
      </Routes>
    </>
  );
};

export default Customer;
