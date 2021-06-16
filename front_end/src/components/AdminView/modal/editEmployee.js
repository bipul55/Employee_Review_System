import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import axios from "axios";
// import { FiCheckCircle } from "react-icons/fi";
const UpdateEmployee = (props) => {
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState(null);
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");

  const changePhoto = (e) => {
    setProfilePic(e.target.files[0]);
    setProfilePicURL(URL.createObjectURL(e.target.files[0]));
  };
  const updateemployee = async () => {
    if (!(name && email && password)) {
      window.alert("please enter all the parameters");
    } else {
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
      formData.append("id", props.node.id);
      axios
        .post(`http://localhost:9000/update-employee`, formData, config)
        .then((data) => {
          console.log(data, "data");
          if (data.data.success) {
            props.setnode(null);
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
    if (props.node) {
      setname(props.node.name);
      setPassword(props.node.password);
      setemail(props.node.email);
      setProfilePicURL(null);
    }
  }, [props.node]);
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
            Update Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.node && (
            <div
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
                      : `http://localhost:9000/get-image/${props.node.profilePic}`
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
              <br />
              <div>
                Name:{" "}
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  onChange={(e) => setname(e.target.value)}
                  value={name}
                />
                <br />
                Email:{" "}
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                />
                <br />
                Password:
                <input
                  type="text"
                  id="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <br />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updateemployee}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default UpdateEmployee;
