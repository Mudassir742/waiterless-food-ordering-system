import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./adminNavbar/Navigation";
import Home from "./screens/Home";
import Menu from "./screens/Menu";
import Customer from "./screens/Customer";
import Employ from "./screens/Employ";

const Admin = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/admin" element={<Home />} />
        <Route path="/adminmenu" element={<Menu />} />
        <Route path="/admincustomer" element={<Customer />} />
        <Route path="/adminemploy" element={<Employ />} />
      </Routes>
    </>
  );
};

export default Admin;
