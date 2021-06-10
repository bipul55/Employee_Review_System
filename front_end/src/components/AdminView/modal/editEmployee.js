import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
// import { FiCheckCircle } from "react-icons/fi";
const UpdateEmployee = (props) => {
  const updateemployee = async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!(name && email && password)) {
      window.alert("please enter all the parameters");
    } else {
      const result = await fetch("http://localhost:9000/update-employee", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          id: props.node.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            props.setnode(null);
            props.get_employees();
            props.onHide();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
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
        <Modal.Body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props.node && (
            <div>
              Name:{" "}
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder={props.node.name}
              />
              <br />
              Email:{" "}
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder={props.node.email}
              />
              <br />
              Password:
              <input
                type="text"
                id="password"
                className="form-control"
                placeholder={props.node.password}
              />
              <br />
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
