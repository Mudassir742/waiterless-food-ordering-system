import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios"

const AddEmploy = (props) => {

  const [userDetail, setUserDetail] = useState({
    name: "",
    userName: "",
    contact: "",
    address:"",
    role:""
  });

  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();

//   const saveFile = (e) => {
//     if (!e.target.files || e.target.files.length === 0) {
//       setFile(undefined);
//       return;
//     }
//     // [0] for only using single image....
//     setFile(e.target.files[0]);
//     //console.log(file);
//   };

//   const uploadFile = async (itemID) => {
//     const formData = new FormData();
//     formData.append("image", file);

//     const config = {
//       headers: {
//           'content-type': 'multipart/form-data'
//       }
//     };
//     try {
//       const res = await axios.post(`/data/upload/itemimage/${itemID}`, formData,config);
//       console.log(res);
//     } catch (ex) {
//       console.log(ex);
//     }
//   };
  //console.log(file);

  //side Effect for image preview......
//   useEffect(() => {
//     if (!file) {
//       setImagePreview(undefined);
//       return;
//     }

//     const objectUrl = URL.createObjectURL(file);
//     setImagePreview(objectUrl);

//     return () => URL.revokeObjectURL(objectUrl);
//   }, [file]);

//   useLayoutEffect(() => {
//     setNewMenuItem({
//       category: props.category,
//       name: props.name,
//       price: props.price,
//     });
//   }, [props.category, props.name, props.price, props.show]);


  const addNewMenuItem = async (e) => {
    e.preventDefault();
    if (
      userDetail.name !== "" &&
      userDetail.userName !== "" &&
      userDetail.contact !== "" && 
      userDetail.address !== "" && 
      userDetail.role !== ""
    ) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetail),
      };

    //   const requestURL = props.isEdit ? "/data/edititem" : "/data/addmenuitems";

    //   const response = await fetch(requestURL, requestOptions);

      //const data = await response.json();

      
      //await uploadFile(data.itemID)
      
      props.setShow(!props.show);
    } else {
      console.log("Input is Empty");
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserDetail({ ...userDetail, [name]: value });
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
            {/* {file && <img src={imagePreview} alt="profile-pic" />} */}
          </div>
          <input type="file" name="image"/>
        </div>

        <div>
          <form className="select-sort">

            <div className="input">
              <input
                type="text"
                className="name-input"
                placeholder="Name"
                name="name"
                value={userDetail.name}
                onChange={handleInputChange}
              />
              <span
                className={
                  userDetail.name ? "showerrormessage" : "error-message"
                }
              >
                name must be a valid value
              </span>
            </div>

            <div className="input">
              <input
                type="text"
                className="name-input"
                placeholder="Username"
                name="userName"
                value={userDetail.userName}
                onChange={handleInputChange}
              />
              <span
                className={
                  userDetail.userName ? "showerrormessage" : "error-message"
                }
              >
                username must be a valid value
              </span>
            </div>

            <div className="input">
              <input
                type="text"
                className="name-input"
                placeholder="Contact"
                name="contact"
                value={userDetail.contact}
                onChange={handleInputChange}
              />
              <span
                className={
                  userDetail.contact ? "showerrormessage" : "error-message"
                }
              >
                contact must be a valid value
              </span>
            </div>

            <div className="input">
              <input
                type="text"
                className="name-input"
                placeholder="Role"
                name="role"
                value={userDetail.role}
                onChange={handleInputChange}
              />
              <span
                className={
                  userDetail.role ? "showerrormessage" : "error-message"
                }
              >
                role must be a valid value
              </span>
            </div>

            <div className="input">
              <input
                type="text"
                className="name-input"
                placeholder="address"
                name="address"
                value={userDetail.address}
                onChange={handleInputChange}
              />
              <span
                className={
                  userDetail.address ? "showerrormessage" : "error-message"
                }
              >
                address must be a valid value
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

export default AddEmploy;
