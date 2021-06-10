import React, { useState, useEffect, useContext } from "react";
import { LogedUser } from "../../App";
import "./nav.scss";
import { Link } from "react-router-dom";

const Nav = () => {
  const [user, setuser] = useContext(LogedUser);

  return (
    <div className="nav-container" style={{}}>
      {user.isEmployee ? (
        <div>
          <div className="nav-item">
            <Link to="/">Pending Reviews</Link>
          </div>
          <div className="nav-item">
            <Link to="/my_reviews">My Reviews</Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Nav;
