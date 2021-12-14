import React from "react";

const AddMenuItems = (props) => {
  return (
    <div className={props.show? "addmenuitem-container" : "hideAddMenu"}>
        <div className="cancel-button" onClick={()=>props.setShow(!props.show)}>
            <i className="fas fa-times"></i>
        </div>
      <div className="image">
        <i>+</i>
      </div>
      <div>
        <form className="select-sort">
          <select className="select-category">
            <option value="all">All</option>
            <option value="reco">Recomended</option>
            <option value="trend">Trending</option>
            <option value="popu">Popularity</option>
            <option value="high">Price: low to high</option>
            <option value="low">Price: high to low</option>
          </select>

          <div className="input">
            <input type="text" className="name-input" placeholder="Name" />
            <span className="error-message">name must be a valid value</span>
          </div>

          <div className="input">
            <input type="text" className="name-input" placeholder="Price" />
            <span className="error-message">price must be a valid value</span>
          </div>

          <button className="add-item-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddMenuItems;
