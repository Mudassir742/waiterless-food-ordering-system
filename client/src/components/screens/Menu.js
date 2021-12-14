import React, { useEffect, useState } from "react";
import { motion } from "framer-motion/dist/es/index";

import AddMenuItems from "../popups/AddMenuItems";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  const [showAddMenu,setShowAddMenu] = useState(false);

  useEffect(() => {
    const getMenuItemData = async () => {
      const headers = { "Content-Type": "application/json" };
      const response = await fetch("/data/api/menuitems", { headers });
      const data = await response.json();

      setMenuItems(data.data);
    };

    getMenuItemData();
  }, []);

  const handleAddItem = (e) =>{
    e.preventDefault()
    setShowAddMenu(!showAddMenu);
  }

  console.log(showAddMenu)
  //console.log(menuItems);

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
          <h2>Menu Items</h2>
          <button onClick={handleAddItem}>Add Items</button>
        </div>

        {/*Menu items are displayed here....*/}

        <div className="home-body">
          {menuItems ? (
            menuItems.map((items, index) => {
              return( <div className="item-container" key={index}>
                <div className="item-detail">
                  <div className="item-pic"></div>
                  <div className="item-content">
                    <h4>Name : {items.itemName}</h4>
                    <h4>Price : Rs.{items.itemPrice} </h4>
                    <h4>Category : {items.itemCategory} </h4>
                  </div>
                </div>
                <div className="item-buttons">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>);
            })
          ) : (
            <h1>Loading.....</h1>
          )}
        </div>
      </div>
      <AddMenuItems show={showAddMenu} setShow={setShowAddMenu}/>
    </motion.div>
  );
};

export default Menu;
