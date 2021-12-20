import React, { useState, useEffect } from "react";
import { motion } from "framer-motion/dist/es/index";

import AddEmploy from "../popups/AddEmploy";

const Employ = () => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [editEmploy, setEditEmploy] = useState({});
  const [employDetail, setEmployDetail] = useState([]);

  const [edit, setEdit] = useState(false);

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
    setEdit(false);
    setShowAddMenu(!showAddMenu);
  };

  const deleteEmploy = async (e, employID, employPhoto) => {
    e.preventDefault();
    console.log(employID);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employPhoto: employPhoto }),
    };
    const response = await fetch(
      `/employ/deleteemploy/${employID}`,
      requestOptions
    );

    getEmployDetail();
  };

  const editEmployDetail = (e, employ) => {
    //e.preventDefault();
    setEdit(true);
    setEditEmploy(employ);
    setShowAddMenu(!showAddMenu);
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
                    
                    <div className="item-pic">{employ.photo && (
                      <img
                        src={employ.photo}
                        alt="employ"
                        className="menu-item-image"
                        style={{borderRadius:'50%'}}
                      />
                    )}</div>
                    <div className="item-content">
                      <h4>Name : {employ.name}</h4>
                      <h4>Contact : {employ.contact}</h4>
                      <h4>Role : {employ.employRole}</h4>
                      <h4>Address : {employ.address}</h4>
                    </div>
                  </div>
                  <div className="item-buttons">
                    <button onClick={(e) => editEmployDetail(e, employ)}>
                      Edit
                    </button>
                    <button
                      onClick={(e) =>
                        deleteEmploy(e, employ.employID, employ.photo)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <AddEmploy
        show={showAddMenu}
        setShow={setShowAddMenu}
        name={edit ? editEmploy.name : ""}
        userName={edit ? editEmploy.username : ""}
        password={edit ? editEmploy.password : ""}
        contact={edit ? editEmploy.contact : ""}
        role={edit ? editEmploy.employRole : ""}
        address={edit ? editEmploy.address : ""}
        employID={edit ? editEmploy.employID : ""}
        isEdit={edit}
      />
    </motion.div>
  );
};

export default Employ;
