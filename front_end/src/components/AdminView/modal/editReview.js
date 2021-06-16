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
          console.log(data);
          if (data.success) {
            props.setnode(null);
            props.get_reviews();
            props.setmessage(data.message);
            props.setshowModal();
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
            {props.node && (
              <div
                style={{
                  display: "flex",
                  gap: "70%",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // flexWrap:""
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  From:{props.node.by_user}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  To:{props.node.for_user}
                </p>
              </div>
            )}
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
                  backgroundColor: "rgb(238 238 238)",
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
