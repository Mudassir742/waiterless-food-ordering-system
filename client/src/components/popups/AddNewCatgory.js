import React, { useState } from "react";

const AddNewCategory = (props) => {
  const [newCategory, setNewCategory] = useState("");

  const addNewMenuItem = async (e) => {
    e.preventDefault();
    if (newCategory !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemCategory: newCategory }),
      };

      const requestURL = "/data/addcategory";

      const response = await fetch(requestURL, requestOptions);

      const data = await response.json();

      console.log(data.data);
      setNewCategory("");
      props.setShow(!props.show);
    } else {
      console.log("Input is Empty");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    setNewCategory(value);
  };

  console.log(newCategory);

  return (
    <div className={props.show ? "menubackground" : "hideAddMenu"}>
      <div className="addmenuitem-container">
        <div
          className="cancel-button"
          onClick={() => {
            props.setShow(!props.show);
            setNewCategory("");
          }}
        >
          <i className="fas fa-times"></i>
        </div>
        <div>
          <form className="select-sort">
            <div className="input">
              <input
                type="text"
                className="name-input"
                placeholder="Name"
                name="itemCategory"
                value={newCategory}
                onChange={handleInputChange}
              />
              <span
                className={
                  newCategory ? "showerrormessage" : "error-message"
                }
              >
                name must be a valid value
              </span>
            </div>
            <button className="add-item-button" onClick={addNewMenuItem}>
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewCategory;
