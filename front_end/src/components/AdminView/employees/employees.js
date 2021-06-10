import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Modal_Admin from "../modal/modal";
import AddEmployee from "../modal/addemployee";
import UpdateEmployee from "../modal/editEmployee";
import Review from "../modal/review";
import { MdAssignment } from "react-icons/md";
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
      />
      <UpdateEmployee
        show={showModalEditEmployee}
        onHide={() => setshowModalEditEmployee(false)}
        node={node}
        get_employees={get_employees}
        setnode={setnode}
      />
      <Review
        show={showModalReview}
        onHide={() => setshowModalReview(false)}
        node={node}
        setnode={setnode}
      />
      <br />
      <br />
      <table
        class="table"
        style={{
          backgroundColor: "rgb(255 255 255)",

          margin: "auto",
          width: "fit-content",
        }}
      >
        <thead class="thead-dark">
          <tr>
            <th scope="col"> Id</th>
            <th scope="col"> Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((node) => {
            return (
              <tr>
                <td>{node.id}</td>

                <td>
                  <p>{node.name}</p>
                </td>
                <td>{node.email}</td>
                <td>
                  <DeleteOutlined
                    style={{ cursor: "pointer", margin: "20px" }}
                    onClick={() => deleteEmployee(node)}
                  />
                  <EditOutlined
                    style={{ cursor: "pointer", margin: "20px" }}
                    onClick={() => {
                      setnode(node);
                      setshowModalEditEmployee(true);
                    }}
                  />
                  <MdAssignment
                    style={{ cursor: "pointer", margin: "20px" }}
                    onClick={() => {
                      setnode(node);
                      setshowModalReview(true);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
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
      </div>
      {/* <Table columns={columns} dataSource={data} /> */}
    </div>
  );
};

export default Employee;
