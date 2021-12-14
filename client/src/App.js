import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

import "./App.css"

import Navigation from "./components/Navigation";
import Home from "./components/screens/Home";
import Menu from "./components/screens/Menu";
import Customer from "./components/screens/Customer";
import Employ from "./components/screens/Employ";


function App() {
  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/employ" element={<Employ/>}/>
      </Routes>
    </Router>
  );
}

export default App;
