import React, { useEffect, useState,useLayoutEffect } from "react";
import { connect } from "react-redux";
import { useNavigate,Navigate} from "react-router-dom";

const CustomerMenu = (props) => {
  const [menuItems, setMenuItems] = useState([]);

  const navigate = useNavigate()

  const getMenuItemData = async () => {
    const headers = { "Content-Type": "application/json" };
    const response = await fetch("/data/api/menuitems", { headers });
    const data = await response.json();
    console.log(data.data);
    setMenuItems(data.data);
  };

  console.log(props.role)

  // useEffect(()=>{
  //   if(props.role === ""){
      
  //   }
  // },[])

  useEffect(() => {
    getMenuItemData();
  }, []);

  const addItemToCart = (e, items) => {
    e.preventDefault();
    props.addItems(items);
  };

  if(!props.role){
    return <Navigate replace to="/" />
  }

  return (
    <div className="menu-container">
      <div className="menu-body">
        {menuItems &&
          menuItems.map((items) => {
            return (
              <div className="menu-item-container" key={items.itemID}>
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
                <div className="add-to-cart-button">
                  <button onClick={(e) => addItemToCart(e, items)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItem: state,
  };
};

const mapDispatchToProps = (Dispatch) => {
  return {
    addItems: (product) => Dispatch({ type: "ADD_ITEM", payload: product }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerMenu);
