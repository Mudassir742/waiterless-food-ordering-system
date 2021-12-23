import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios"

const AddMenuItems = (props) => {
  const [inputItemCategories, setInputItemCategory] = useState([]);

  const [newMenuItem, setNewMenuItem] = useState({
    category: "",
    name: "",
    price: "",
  });

  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();

  const saveFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    // [0] for only using single image....
    setFile(e.target.files[0]);
    //console.log(file);
  };

  const uploadFile = async (itemID) => {
    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    try {
      const res = await axios.post(`/data/upload/itemimage/${itemID}`, formData,config);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  //console.log(file);

  //side Effect for image preview......
  useEffect(() => {
    if (!file) {
      setImagePreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useLayoutEffect(() => {
    setNewMenuItem({
      category: props.category,
      name: props.name,
      price: props.price,
    });
  }, [props.category, props.name, props.price, props.show]);

  const getSelectInputCategories = async () => {
    const headers = { "Content-Type": "application/json" };
    const response = await fetch("/data/api/categories", { headers });
    const data = await response.json();

    setInputItemCategory(data.data);
  };

  const addNewMenuItem = async (e) => {
    e.preventDefault();
    if (
      newMenuItem.category !== "" &&
      newMenuItem.name !== "" &&
      newMenuItem.price !== "" && file.name !== ""
    ) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          props.isEdit ? { ...newMenuItem, itemID: props.itemID } : newMenuItem
        ),
      };

      const requestURL = props.isEdit ? "/data/edititem" : "/data/addmenuitems";

      const response = await fetch(requestURL, requestOptions);

      const data = await response.json();

      
      await uploadFile(data.itemID)
      

      props.setShow(!props.show);
    } else {
      console.log("Input is Empty");
    }
  };

  //console.log(newMenuItem);

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
    <div className={props.show ? "menubackground" : "hideAddMenu"}>
      <div className="addmenuitem-container">
        <div
          className="cancel-button"
          onClick={() => {
            props.setShow(!props.show);
          }}
        >
          <i className="fas fa-times"></i>
        </div>
        <div className="profile-image-container">
          <div className="image">
            {file && <img src={imagePreview} alt="profile-pic" />}
          </div>
          <input type="file" name="image" onChange={saveFile} />
          {/* <button onClick={uploadFile}>Submit</button> */}
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
                value={newMenuItem.name}
                onChange={handleInputChange}
              />
              <span
                className={
                  newMenuItem.name ? "showerrormessage" : "error-message"
                }
              >
                name must be a valid value
              </span>
            </div>

            <div className="input">
              <input
                type="number"
                className="name-input"
                placeholder="Price"
                min="50"
                max="3000"
                name="price"
                value={newMenuItem.price}
                onChange={handleInputChange}
              />
              <span
                className={
                  newMenuItem.price ? "showerrormessage" : "error-message"
                }
              >
                price must be a valid value
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

export default AddMenuItems;
