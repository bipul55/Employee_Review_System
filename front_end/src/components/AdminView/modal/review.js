import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { Checkbox, Row, Col } from "antd";

// import { FiCheckCircle } from "react-icons/fi";
const Review = (props) => {
  const [employees, setemployees] = useState([]);
  const [reviewEmployee, setreviewEmployee] = useState("");
  const addReviewer = async () => {
    const result = await fetch("http://localhost:9000/add-review", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        for_user: props.node.email,
        by_user: reviewEmployee,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          props.setnode(null);
          props.onHide();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const get_employees = async () => {
    await fetch(`http://localhost:9000/get-all-employees`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        // "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setemployees([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeSelect = (data) => {
    console.log(typeof data, data);
    setreviewEmployee(data[0]);
  };
  const disableCheckbox = (value) => {
    if (reviewEmployee) {
      if (reviewEmployee == value) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  useEffect(() => {
    get_employees();
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
            Asign Employee
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
              <Checkbox.Group style={{ width: "100%" }} onChange={changeSelect}>
                {employees &&
                  employees.length > 0 &&
                  employees.map((node) => {
                    return (
                      <Checkbox
                        key={node.id}
                        value={node.email}
                        //   checked={checked(node.email)}
                        //   checked={true}
                        disabled={disableCheckbox(node.email)}
                      >
                        {node.email}
                      </Checkbox>
                    );
                  })}
              </Checkbox.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addReviewer}>Done</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Review;
