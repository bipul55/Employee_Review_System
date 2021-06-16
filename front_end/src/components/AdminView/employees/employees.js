import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Modal_Admin from "../modal/modal";
import AddEmployee from "../modal/addemployee";
import UpdateEmployee from "../modal/editEmployee";
import Review from "../modal/review";
import { MdAssignment } from "react-icons/md";
import "./employees.scss";
const Employee = () => {
  const [employees, setemployees] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [node, setnode] = useState(null);

  const [showModalAddEmployee, setshowModalAddEmployee] = useState(false);
  const [showModalEditEmployee, setshowModalEditEmployee] = useState(false);
  const [showModalReview, setshowModalReview] = useState(false);

  const [modalMsg, setmodalMsg] = useState("");
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
  const deleteEmployee = async (node) => {
    setshowModal(true);
    const result = await fetch(`http://localhost:9000/delete-employee`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: node.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setmodalMsg(data.message);
          get_employees();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    get_employees();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Employees
      </h2>
      <Modal_Admin
        show={showModal}
        onHide={() => setshowModal(false)}
        message={modalMsg}
        setmessage={() => setmodalMsg("")}
      />
      <AddEmployee
        show={showModalAddEmployee}
        onHide={() => setshowModalAddEmployee(false)}
        get_employees={get_employees}
        setmessage={setmodalMsg}
        setshowModal={() => setshowModal(true)}
      />
      <UpdateEmployee
        show={showModalEditEmployee}
        onHide={() => setshowModalEditEmployee(false)}
        node={node}
        get_employees={get_employees}
        setnode={setnode}
        setmessage={setmodalMsg}
        setshowModal={() => setshowModal(true)}
      />
      <Review
        show={showModalReview}
        onHide={() => setshowModalReview(false)}
        node={node}
        setnode={setnode}
      />
      <br />
      <br />

      <div className="row">
        {employees.map((node) => {
          return (
            <div className="col-xl-4" style={{ margin: "20px 0px" }}>
              <div className="employee-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`http://localhost:9000/get-image/${node.profilePic}`}
                    className="profile-image"
                  />
                </div>
                <div
                  style={{
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center",
                    // gap: "20%",
                    marginTop: "20px",
                    // flexWrap: "wrap",
                  }}
                >
                  {" "}
                  <p style={{ textAlign: "left" }}>
                    <label style={{ fontWeight: "700" }}>Name:</label>{" "}
                    {node.name}
                  </p>
                  <p style={{ textAlign: "left" }}>
                    <label style={{ fontWeight: "700" }}>Email:</label>{" "}
                    {node.email}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DeleteOutlined
                    className="icon"
                    onClick={() => deleteEmployee(node)}
                  />
                  <EditOutlined
                    className="icon"
                    onClick={() => {
                      setnode(node);
                      setshowModalEditEmployee(true);
                    }}
                  />
                  <MdAssignment
                    className="icon"
                    onClick={() => {
                      setnode(node);
                      setshowModalReview(true);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="col-lg-4" style={{ margin: "20px 0px" }}>
          <div className="employee-card">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontWeight: "500",
                cursor: "pointer",
              }}
              onClick={() => setshowModalAddEmployee(true)}
            >
              + Add employee
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="btn btn-dark"
        style={{
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "50px",
        }}
        onClick={() => setshowModalAddEmployee(true)}
      >
        Add Employee
      </div> */}
      {/* <Table columns={columns} dataSource={data} /> */}
    </div>
  );
};

export default Employee;
