import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const RviewOrder = (props) => {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < props.cartItem.length; i++) {
      count = count + props.cartItem[i].itemPrice;
    }
    //console.log(count)
    setTotalPrice(count);
  }, [props.cartItem]);

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      //if all the inputs are filled up...
      const isPlaced = await fetch("/order/placeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerID: "4d1408a6fbcf30bf2abc4e18ff33d8dc",
          totalPrice,
          foodItems: props.cartItem,
        }),
      });

      const data = await isPlaced.json();
      console.log(data);
      if (data.data === "order is placed") {
        toast.success("Order is Placed");
        console.log("Order Placed");
        setTimeout(() => {
          navigate("/customer");
        }, 2000);
      } else {
        toast.error("Unable to place order");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="review-order-main">
      <div className="review-order-container">
        <h1>Order Summary</h1>
        <div className="review-order-card">
          <div className="items-detail">
            <h2>Name</h2>
            <h2>Quantity</h2>
            <h2>Price</h2>
          </div>

          {props.cartItem.map((item) => {
            return (
              <div className="items-in-order">
                <div className="items-detail">
                  <span>{item.itemName}</span>
                  <span>{item.itemQuantity}</span>
                  <span>{item.itemPrice}</span>
                </div>
              </div>
            );
          })}

          <div className="total">
            <h2>Total</h2>
            <h2 class="total-price">{totalPrice}</h2>
          </div>
        </div>
        <button className="place-order-btn" onClick={placeOrder}>
          Place Order
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItem: state,
  };
};

export default connect(mapStateToProps, null)(RviewOrder);
