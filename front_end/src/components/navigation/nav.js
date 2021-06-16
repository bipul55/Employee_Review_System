import React, { useState, useEffect, useContext } from "react";
import { LogedUser } from "../../App";
import "./nav.scss";
import { Link } from "react-router-dom";

const Nav = () => {
  const [user, setuser] = useContext(LogedUser);
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload(false);
  };
  return (
    <div className="navigation">
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <h1>LOGO</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav" style={{ margin: "auto" }}>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Pending Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/my-reviews" className="nav-link">
                {" "}
                My Reviews
              </Link>
            </li>
          </ul>
          <img
            className="image"
            src={`http://localhost:9000/get-image_from_email/${user.email}`}
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "50px",
              marginRight: "50px",
            }}
          />
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              logout();
              window.location.reload(false);
            }}
          >
            logout
          </button>
        </div>
      </nav>
    </div>
  );
};
export default Nav;
