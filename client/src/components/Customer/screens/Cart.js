import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

const Cart = (props) => {
  //props.cartItem && console.log(props.cartItem);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {  
    let count = 0;
    for (let i = 0; i < props.cartItem.length; i++) {
      count = count + props.cartItem[i].itemPrice;
    }
    //console.log(count)
    setTotalPrice(count);
  }, [props.cartItem]);

  const removeItemFromCart = (e, items) => {
    e.preventDefault();
    props.removeItem(items);
  };

  const addItemToCart = (e, items) => {
    e.preventDefault();
    props.addItems(items);
  };
  return (
    <div className="menu-container">
      <div className="menu-body">
        {props.cartItem ? (
          props.cartItem.map((items, index) => {
            return (
              <div className="menu-item-container" key={index}>
                <div className="item-image">
                  {items.itemPhoto && (
                    <img
                      src={items.itemPhoto}
                      alt="Menu-Item"
                      className="menu-item-image"
                    />
                  )}
                </div>
                <div className="item-info">
                  <h3>{items.itemName}</h3>
                  <h3>RS. {items.itemPrice}</h3>
                </div>
                <div className="cart-buttons">
                  <button onClick={(e) => removeItemFromCart(e, items)}>
                    -
                  </button>
                  <button onClick={(e) => addItemToCart(e, items)}>+</button>
                </div>
                <span className="itemQuantity">{items.itemQuantity}</span>
              </div>
            );
          })
        ) : (
          <h1>Oops! Cart is Empty</h1>
        )}

      </div>
      <Link to="/revieworder" className={props.cartItem.length ? "showbutton" : "hidebutton"}><span>CheckOut</span><span className="price-in-btn">RS. {totalPrice}</span></Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItem: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (product) =>
      dispatch({ type: "REMOVE_ITEM", payload: product }),
    addItems: (product) => dispatch({ type: "ADD_ITEM", payload: product }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
