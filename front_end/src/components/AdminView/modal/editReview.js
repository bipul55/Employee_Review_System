import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
// import { FiCheckCircle } from "react-icons/fi";
const EditReview = (props) => {
  const updateReview = async () => {
    const description = document.getElementById("description").value;

    if (!description) {
      window.alert("please enter all the parameters");
    } else {
      const result = await fetch("http://localhost:9000/update-review", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          description: description,
          id: props.node.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            props.setnode(null);
            props.get_reviews();
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
            <div style={{ display: "flex", gap: "40%" }}>
              <h4>From: {props.node && props.node.by_user}</h4>
              <h4>To: {props.node && props.node.for_user}</h4>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.node && (
            <div>
              <textarea
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "10px",
                  border: "0px",
                  backgroundColor: "#ceecfb",
                  resize: "none",
                }}
                id="description"
              >
                {props.node.description}
              </textarea>
              <br />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={updateReview}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default EditReview;
