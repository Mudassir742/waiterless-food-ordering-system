import React from "react";
import { motion } from "framer-motion/dist/es/index";

const Employ = () => {
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
          <button>Add Employ</button>
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
    </motion.div>
  );
};

export default Employ;
