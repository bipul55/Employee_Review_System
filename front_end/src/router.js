import React, { useContext, useEffect } from "react";
import { LogedUser } from "./App";
import { Spinner } from "react-bootstrap";

// import { Spinner } from "react-bootstrap";
import EmployeeView from "./components/employeeView/employeeView";
// import AdminView from "./components/AdminView/adminView";
import Container from "./components/AdminView/adminPanel/container";
import Login from "./components/login/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Router1 = () => {
  const [user, setuser] = useContext(LogedUser);

  useEffect(() => {}, []);
  return (
    <div>
      {user.data ? (
        <Router basename={process.env.PUBLIC_URL}>
          <div>
            <Switch>
              <Route
                path="/"
                exact
                component={
                  user.isUser
                    ? user.isEmployee
                      ? EmployeeView
                      : Container
                    : Login
                }
                EmployeeView
              />
              {/* <Route path="/admin" exact component={AdminView} /> */}
              <Route path="/login" exact component={Login} />
            </Switch>
          </div>
        </Router>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
};
export default Router1;
