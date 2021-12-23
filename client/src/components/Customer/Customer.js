import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomerMenu from "./screens/CustomerMenu";
import CustomerNavbar from "./customerNavbar/CustomerNavbar";
import Cart from "./screens/Cart";
import ReviewOrder from "./screens/RviewOrder";

const Customer = () => {
  return (
    <>
      <CustomerNavbar />
      <Routes>
        <Route path="/customer" element={<CustomerMenu />} />
        <Route path="/customercart" element={<Cart />} />
        <Route path="/revieworder" element={<ReviewOrder />} />
      </Routes>
    </>
  );
};

export default Customer;
