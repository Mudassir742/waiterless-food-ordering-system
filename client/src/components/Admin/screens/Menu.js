import React, { useEffect, useState } from "react";
import { motion } from "framer-motion/dist/es/index";

import AddMenuItems from "../popups/AddMenuItems";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [items, setItems] = useState({});
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [edit,setEdit] = useState(false)

  const getMenuItemData = async () => {
    const headers = { "Content-Type": "application/json" };
    const response = await fetch("/data/api/menuitems", { headers });
    const data = await response.json();
    console.log(data.data)
    setMenuItems(data.data);
  };

  useEffect(() => {
    getMenuItemData();
  }, [showAddMenu]);

  const handleAddItem = (e) => {
    e.preventDefault();
    setEdit(false);
    setShowAddMenu(!showAddMenu);
  };

  const eidtMenuItems = (e, items) => {
    //e.preventDefault();
    setEdit(true);
    setItems(items);
    setShowAddMenu(!showAddMenu);
  };

  const deleteItems = async (e, itemID,itemPhoto) => {
    e.preventDefault();
    console.log(itemID);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({itemPhoto:itemPhoto}),
    };
    const response = await fetch(`/data/removeitem/${itemID}`,requestOptions);

    console.log(response.data);
    getMenuItemData();
  };

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
              return (
                <div className="item-container" key={index}>
                  <div className="item-detail">
                    <div className="item-pic">
                      {items.itemPhoto && <img src={items.itemPhoto} alt="Menu-Item" className="menu-item-image" style={{borderRadius:'10%'}}/>}
                    </div>
                    <div className="item-content">
                      <h4>Name : {items.itemName}</h4>
                      <h4>Price : Rs.{items.itemPrice} </h4>
                      <h4>Category : {items.itemCategory} </h4>
                    </div>
                  </div>
                  <div className="item-buttons">
                    <button onClick={(e) => eidtMenuItems(e, items)}>
                      Edit
                    </button>
                    <button onClick={(e) => deleteItems(e, items.itemID,items.itemPhoto)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Loading.....</h1>
          )}
        </div>
      </div>
      <AddMenuItems
        show={showAddMenu}
        setShow={setShowAddMenu}
        name={edit ? items.itemName : ""}
        price={edit ? items.itemPrice : ""}
        category={edit ? items.itemCat : ""}
        itemID={edit ? items.itemID : ""}
        itemPhoto = {edit ? items.itemPhoto : ""}
        isEdit={edit}
      />
    </motion.div>
  );
};

export default Menu;
