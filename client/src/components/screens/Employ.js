import React,{useState,useEffect} from "react";
import { motion } from "framer-motion/dist/es/index";

import AddEmploy from "../popups/AddEmploy";


const Employ = () => {

  const [showAddMenu, setShowAddMenu] = useState(false);

  const [employDetail,setEmployDetail] = useState([])

  const getMenuItemData = async () => {
    const headers = { "Content-Type": "application/json" };
    const response = await fetch("/data/api/menuitems", { headers });
    const data = await response.json();


  };

  const handleAddItem = (e) => {
    e.preventDefault();
  
    setShowAddMenu(!showAddMenu);
  };

  // const deleteItems = async (e, itemID,itemPhoto) => {
  //   e.preventDefault();
  //   console.log(itemID);
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({itemPhoto:itemPhoto}),
  //   };
  //   const response = await fetch(`/data/removeitem/${itemID}`,requestOptions);

  //   console.log(response.data);
  //   getMenuItemData();
  // };

  return (
    <motion.div
    exit={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    transition={{ delay: .2 }}
    className="home-main">
      <div className="home-container">
        <div className="home-header">
          <h2>Employ</h2>
          <button onClick={handleAddItem}>Add Employ</button>
        </div>
        <div className="home-body">
          <div className="item-container">
            <div className="item-detail">
              <div className="item-pic"></div>
              <div className="item-content">
                <h4>Name : Coder </h4>
                <h4>Contact : 03000000000 </h4>
                <h4>Role : Cashier </h4>
                <h4>Address : House No.....200 </h4>
              </div>
            </div>
            <div className="item-buttons">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
          <div className="item-container">
            <div className="item-detail">
              <div className="item-pic"></div>
              <div className="item-content">
                <h4>Name : Coder </h4>
                <h4>Contact : 03000000000 </h4>
                <h4>Role : Cashier </h4>
                <h4>Address : House No.....200 </h4>
              </div>
            </div>
            <div className="item-buttons">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
          <div className="item-container">
            <div className="item-detail">
              <div className="item-pic"></div>
              <div className="item-content">
                <h4>Name : Coder </h4>
                <h4>Contact : 03000000000 </h4>
                <h4>Role : Cashier </h4>
                <h4>Address : House No.....200 </h4>
              </div>
            </div>
            <div className="item-buttons">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      </div>
      <AddEmploy show={showAddMenu}
        setShow={setShowAddMenu}/>
    </motion.div>
  );
};

export default Employ;
