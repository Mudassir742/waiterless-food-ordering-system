import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomerMenu from "./screens/CustomerMenu";
import CustomerNavbar from "./customerNavbar/CustomerNavbar";
import Cart from "./screens/Cart";
import ReviewOrder from "./screens/RviewOrder";
import CustomerProfile from "./screens/CustomerProfile";
import OrderHistory from "./screens/OrderHistory";

const Customer = ({setRole,user,role}) => {
  return (
    <>
      <CustomerNavbar setRole={setRole} user={user}/>
      <Routes>
        <Route path="/customer" element={<CustomerMenu role={role}/>} />
        <Route path="/customercart" element={<Cart />} />
        <Route path="/revieworder" element={<ReviewOrder user={user}/>} />
        <Route path="/customerprofile" element={<CustomerProfile user={user} setRole={setRole}/>} />
        <Route path="/customerorderhistory" element={<OrderHistory user={user}/>} />
      </Routes>
    </>
  );
};

export default Customer;
