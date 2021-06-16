import React from "react";
import { Tab, Col, Row, Nav } from "react-bootstrap";
import Employee from "../employees/employees";
import Reviews from "../Review/review";
import "./container.scss";

const Container = () => {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload(false);
  };
  return (
    <div
      className="container-admin"
      style={{
        minHeight: "100vh",
      }}
    >
      <Tab.Container defaultActiveKey="Employees">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className=" tabs-admin">
              <Nav.Item>
                <Nav.Link eventKey="Employees">Employees</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Reviews">Reviews</Nav.Link>
              </Nav.Item>
              <div
                className="btn btn-sm btn-dark admin-logout"
                onClick={logout}
                // style={{
                //   width: "80%",
                //   position: "absolute",
                //   bottom: "30px",
                //   left: "50%",
                //   transform: "translateX(-50%)",
                // }}
              >
                Logout
              </div>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="Employees">
                <Employee />
              </Tab.Pane>
              <Tab.Pane eventKey="Reviews">
                <Reviews />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Container;
