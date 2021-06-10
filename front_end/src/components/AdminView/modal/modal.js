import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
// import { FiCheckCircle } from "react-icons/fi";
const Modal_Admin = (props) => {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props.message ? (
            <div
              style={{
                fontSize: "28px",
              }}
            >
              {props.message}
            </div>
          ) : (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              props.setmessage();
              props.onHide();
            }}
          >
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Modal_Admin;
