import React,{useState,useEffect} from "react";
import { motion } from "framer-motion/dist/es/index";

const Customer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const getCustomerData = async () => {
      try {
        const headers = { "Content-Type": "application/json" };
        const response = await fetch("/data/api/customers", { headers });
        const data = await response.json();
        setCustomers(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getCustomerData();
    // console.log(categories);
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
          <h2>Customer Details</h2>
        </div>
        <div className="home-body">
          <div className="customer-table-header">
            <h3>Sr#</h3>
            <h3>Username</h3>
            <h3>Contact</h3>
            <h3>Address</h3>
          </div>

          {/*customer data is displayed here....*/}

          {customers ? (
            customers.map((items, index) => {
              return (
                <div className="customer-table-row" key={index}>
                  <h4>{index + 1}</h4>
                  <h4>{items.username}</h4>
                  <h4>{items.contact}</h4>
                  <h4>{items.address}</h4>
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

export default Customer;
