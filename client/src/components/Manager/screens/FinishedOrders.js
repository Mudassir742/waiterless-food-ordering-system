import React, { useEffect, useState } from "react";
import { motion } from "framer-motion/dist/es/index";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    const headers = { "Content-Type": "application/json" };
    const response = await fetch("/order/orders/finishedorders", { headers });
    const data = await response.json();

    setOrders(data.data);
  };

  console.log(orders);

  useEffect(() => {
    getAllOrders();
  }, []);

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
          <h2>Order Detail</h2>
        </div>

        <div className="order-container">
          <h2>Order#</h2>
          <h2>Date</h2>
          <h2>Satus</h2>
          <h2>Total Amount</h2>
        </div>

        {/*Order Details are displayed here....*/}

        <div className="home-body">
          {orders ? (
            orders.map((items, index) => {
              return (
                <div className="order-container order-detail" key={index}>
                  <span>{index + 1}</span>
                  <span>{items.createAt}</span>
                  <span>{items.status}</span>
                  <span>{items.totalAmount}</span>
                </div>
              );
            })
          ) : (
            <h1>Loading.....</h1>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ManageOrders;
