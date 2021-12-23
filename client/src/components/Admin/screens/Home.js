import React, { useEffect, useState } from "react";
import { motion } from "framer-motion/dist/es/index";
import AddNewCategory from "../popups/AddNewCatgory";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);

  useEffect(() => {
    const getItemData = async () => {
      try {
        const headers = { "Content-Type": "application/json" };
        const response = await fetch("/data/api/categories", { headers });
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getItemData();
    // console.log(categories);
  }, [showAddMenu]);

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
          <h2>Categories</h2>
          <button onClick={(e) => setShowAddMenu(!showAddMenu)}>
            Add Category
          </button>
        </div>
        <div className="home-body">
          <div className="table-header">
            <h3>Sr#</h3>
            <h3>Category</h3>
          </div>

          {/*rendering categories data here.....*/}
          {categories ? (
            categories.map((item, index) => {
              return (
                <div className="table-row" key={index}>
                  <h4>{index + 1}</h4>
                  <h4>{item.catName}</h4>
                  {/* <h4>200</h4> */}
                </div>
              );
            })
          ) : (
            <h1>Loading....</h1>
          )}
        </div>
      </div>
      <AddNewCategory show={showAddMenu} setShow={setShowAddMenu} />
    </motion.div>
  );
};

export default Home;
