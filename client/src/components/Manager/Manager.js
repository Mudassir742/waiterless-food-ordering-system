import React from "react";
import ManageOrders from "./screens/ManageOrders";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ManagerNavbar from "./ManagerNavbar/ManagerNavbar";
import FinishedOrders from "./screens/FinishedOrders"

const Manager = ({setRole,user}) => {
  return (
    <>
      <ManagerNavbar setRole={setRole} user={user}/>
      <Routes>
        <Route path="/orderhistory" element={<ManageOrders />} />
        <Route path="/finishedorders" element={<FinishedOrders />} />
      </Routes>
    </>
  );
};

export default Manager;
