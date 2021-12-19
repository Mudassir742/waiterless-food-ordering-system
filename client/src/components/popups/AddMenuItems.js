import React, { useEffect, useState } from "react";

const AddMenuItems = (props) => {
  const [inputItemCategories, setInputItemCategory] = useState([]);

  const [newMenuItem, setNewMenuItem] = useState({
    category: "",
    name: "",
    price: "",
  });

  const getSelectInputCategories = async () => {
    const headers = { "Content-Type": "application/json" };
    const response = await fetch("/data/api/categories", { headers });
    const data = await response.json();

    setInputItemCategory(data.data);
  };

  const addNewMenuItem = async (e) => {
    e.preventDefault();
    if (newMenuItem.category!=="" && newMenuItem.name!=="" && newMenuItem.price!=="") {
      
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props.isEdit ? {...newMenuItem,itemID:props.itemID} : newMenuItem),
      };
      
      const requestURL = props.isEdit ? "/data/edititem" : "/data/addmenuitems";

      const response = await fetch(requestURL, requestOptions);

      const data = await response.json();

      console.log(data.data);
      props.setShow(!props.show);
      
    } else {
      console.log("Input is Empty");
    }
  };

  useEffect(() => {
    getSelectInputCategories();
  }, []);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewMenuItem({ ...newMenuItem, [name]: value });
  };

  //console.log(inputItemCategories);
  // console.log(newMenuItem);

  return (
    <div className={props.show ? "addmenuitem-container" : "hideAddMenu"}>
      <div className="cancel-button" onClick={() => props.setShow(!props.show)}>
        <i className="fas fa-times"></i>
      </div>
      <div className="image">
        <i>+</i>
      </div>
      <div>
        <form className="select-sort">
          <select
            className="select-category"
            name="category"
            onChange={handleInputChange}
          >
            {/*categories already in database*/}
            {inputItemCategories &&
              inputItemCategories.map((categories) => {
                return (
                  <option key={categories.catID} value={categories.catID}>
                    {categories.catName}
                  </option>
                );
              })}
          </select>

          <div className="input">
            <input
              type="text"
              className="name-input"
              placeholder="Name"
              name="name"
              defaultValue={props.name ? props.name : ""}
              onChange={handleInputChange}
            />
            <span className={newMenuItem.name ? "showerrormessage" : "error-message"}>name must be a valid value</span>
          </div>

          <div className="input">
            <input
              type="number"
              className="name-input"
              placeholder="Price"
              min="50"
              max="3000"
              name="price"
              defaultValue={props.price ? parseInt(props.price) : ""}
              onChange={handleInputChange}
            />
            <span className={newMenuItem.price ? "showerrormessage" : "error-message"}>price must be a valid value</span>
          </div>

          <button className="add-item-button" onClick={addNewMenuItem}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenuItems;
