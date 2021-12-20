import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";

const AddEmploy = (props) => {
  const [userDetail, setUserDetail] = useState({
    name: "",
    userName: "",
    password: "",
    contact: "",
    address: "",
    role: "",
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

    const uploadFile = async (employID) => {
      const formData = new FormData();
      formData.append("employImage", file);

      const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
      };
      try {
        const res = await axios.post(`/employ/upload/employimage/${employID}`, formData,config);
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
    setUserDetail({
      name: props.name,
      userName: props.userName,
      password: props.password,
      contact: props.contact,
      address: props.address,
      role: props.role,
    });
  }, [
    props.name,
    props.userName,
    props.password,
    props.contact,
    props.address,
    props.role,
  ]);

  const addNewMenuItem = async (e) => {
    e.preventDefault();
    if (
      userDetail.name !== "" &&
      userDetail.userName !== "" &&
      userDetail.contact !== "" &&
      userDetail.address !== "" &&
      userDetail.role !== "" &&
      userDetail.password !== ""
    ) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          props.isEdit
            ? { ...userDetail, employID: props.employID }
            : userDetail
        ),
      };

      const requestURL = props.isEdit
        ? "/employ/updateemploy"
        : "/employ/newemploy";

      const response = await fetch(requestURL, requestOptions);

      const data = await response.json();

      await uploadFile(data.data)

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

  console.log(userDetail);
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
        </div>

        <div>
          <form className="select-sort">
            <div>
              <input
                type="text"
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

            <div>
              <input
                type="text"
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

            <div>
              <input
                type="text"
                placeholder="password"
                name="password"
                value={userDetail.password}
                onChange={handleInputChange}
              />
              <span
                className={
                  userDetail.password ? "showerrormessage" : "error-message"
                }
              >
                username must be a valid value
              </span>
            </div>

            <div>
              <input
                type="text"
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

            <div>
              <input
                type="text"
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

            <div>
              <input
                type="text"
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
