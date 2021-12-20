import React, { useState, useEffect } from "react";
import { motion } from "framer-motion/dist/es/index";

import AddEmploy from "../popups/AddEmploy";

const Employ = () => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const [employDetail, setEmployDetail] = useState([]);

  const getEmployDetail = async () => {
    try {
      const headers = { "Content-Type": "application/json" };
      const response = await fetch("/employ/allemploy", { headers });
      const data = await response.json();

      setEmployDetail(data.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getEmployDetail();
  }, [showAddMenu]);

  console.log(employDetail);

  const handleAddItem = (e) => {
    e.preventDefault();

    setShowAddMenu(!showAddMenu);
  };

  const deleteEmploy = async (e, employID) => {
    e.preventDefault();
    console.log(employID);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify({itemPhoto:itemPhoto}),
    };
    const response = await fetch(
      `/employ/deleteemploy/${employID}`,
      requestOptions
    );

    getEmployDetail();
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay: 0.2 }}
      className="home-main"
    >
      <div className="home-container">
        <div className="home-header">
          <h2>Employ</h2>
          <button onClick={handleAddItem}>Add Employ</button>
        </div>
        {employDetail &&
          employDetail.map((employ) => {
            return (
              <div className="home-body" key={employ.employID}>
                <div className="item-container">
                  <div className="item-detail">
                    <div className="item-pic"></div>
                    <div className="item-content">
                      <h4>Name : {employ.name}</h4>
                      <h4>Contact : {employ.contact}</h4>
                      <h4>Role : {employ.employRole}</h4>
                      <h4>Address : {employ.address}</h4>
                    </div>
                  </div>
                  <div className="item-buttons">
                    <button>Edit</button>
                    <button onClick={(e) => deleteEmploy(e, employ.employID)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <AddEmploy show={showAddMenu} setShow={setShowAddMenu} />
    </motion.div>
  );
};

export default Employ;
