import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Spinner } from "react-bootstrap";
// import { FiCheckCircle } from "react-icons/fi";
const AddEmployee = (props) => {
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState(null);
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

  const changePhoto = (e) => {
    setProfilePic(e.target.files[0]);
    setProfilePicURL(URL.createObjectURL(e.target.files[0]));
  };
  const addEmployee = async () => {
    if (!(name && email && password)) {
      window.alert("please enter all the parameters");
    } else {
      // const result = await fetch("http://localhost:9000/add-employee", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json;charset=utf-8",
      //   },
      //   body: JSON.stringify({ name: name, email: email, password: password }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     if (data.success) {
      //       props.get_employees();
      //       props.onHide();
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.append("email", email);
      formData.append("profilePic", profilePic);
      formData.append("name", name);
      formData.append("password", password);

      axios
        .post(`http://localhost:9000/add-employee`, formData, config)
        .then((data) => {
          console.log(data, "data");
          if (data.data.success) {
            props.get_employees();
            props.setmessage(data.data.message);
            props.setshowModal();
            props.onHide();
          }
        })
        .catch((error) => {});
    }
  };
  useEffect(() => {
    console.log("logged");
    if (props.node) {
      setname(props.node.name);
      setPassword(props.node.password);
      setemail(props.node.email);
      setProfilePicURL(null);
    }
  }, [props.node]);
  useEffect(() => {
    setProfilePicURL(null);
    console.log("rendered");
  }, []);
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10%",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="file"
              id="profile_pic"
              style={{ display: "none" }}
              onChange={changePhoto}
            />
            <img
              src={
                profilePicURL
                  ? profilePicURL
                  : `http://localhost:9000/get-image/null`
              }
              style={{
                height: "200px",
                width: "200px",
              }}
            ></img>
            <label
              for="profile_pic"
              style={{
                transform: "translate(-293%, 275%)",
              }}
            >
              <div className="btn btn-dark btn-sm">Edit</div>
            </label>
          </div>
          <div>
            Name:{" "}
            <input
              type="text"
              id="name"
              onChange={(e) => setname(e.target.value)}
              value={name}
              className="form-control"
            />
            <br />
            Email:{" "}
            <input
              type="text"
              id="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              className="form-control"
            />
            <br />
            Password:
            <input
              type="text"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
            />
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addEmployee}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddEmployee;
