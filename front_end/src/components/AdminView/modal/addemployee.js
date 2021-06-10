import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
// import { FiCheckCircle } from "react-icons/fi";
const AddEmployee = (props) => {
  const addEmployee = async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!(name && email && password)) {
      window.alert("please enter all the parameters");
    } else {
      const result = await fetch("http://localhost:9000/add-employee", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ name: name, email: email, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
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
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            Name:{" "}
            <input
              type="text"
              id="name"
              placeholder="Name"
              className="form-control"
            />
            <br />
            Email:{" "}
            <input
              type="text"
              id="email"
              placeholder="Email"
              className="form-control"
            />
            <br />
            Password:
            <input
              type="text"
              id="password"
              placeholder="Password"
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
