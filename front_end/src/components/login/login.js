import React, { useContext } from "react";
import "./login.scss";
import { Link, Redirect } from "react-router-dom";
import { LogedUser } from "../../App";
import { GooglePlusCircleFilled } from "@ant-design/icons";
import { FacebookFilled, LinkedinOutlined } from "@ant-design/icons";

const Login = () => {
  const [user, setuser] = useContext(LogedUser);

  //send an login requect to the server
  const log = async () => {
    var mail = document.getElementById("email").value;
    var pw = document.getElementById("password").value;

    // try {
    const result = await fetch(`http://localhost:9000/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email: mail, password: pw }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.info) {
          window.alert(data.info);
        }
        if (data) {
          console.log(data);
          if (data.fail) {
            window.alert("The Credential You provided is wrong");
          } else if (data.accessToken) {
            var token = data.accessToken;
            localStorage.setItem("user", JSON.stringify(token));
            window.location.reload(false);
            console.log(data, "data");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // if user is already loggedin then redirect to home page
  if (user.isUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">
      <div className="wrapper">
        <h1
          style={{
            textAlign: "center",
          }}
        >
          LOGO
        </h1>
        <hr></hr>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Login
        </h2>

        <a
          className="btn  btn-lg"
          href="#"
          style={{
            width: "90%",
            textAlign: "left",
            margin: "10px 5%",
            backgroundColor: "rgb(66,103,178)",
            borderRadius: "0px",
            color: "white",
          }}
        >
          <FacebookFilled
            style={{
              position: "relative",
              top: "-4px",
              marginRight: "10px",
            }}
          />
          Get Started with Facebook
        </a>
        <a
          className="btn  btn-lg"
          href="#"
          style={{
            width: "90%",
            textAlign: "left",
            margin: " 10px 5%",
            backgroundColor: "rgb(219,68,55)",
            borderRadius: "0px",
            color: "white",
          }}
        >
          <GooglePlusCircleFilled
            style={{
              position: "relative",
              top: "-4px",
              marginRight: "10px",
            }}
          />
          Get Started with google
        </a>
        <a
          className="btn  btn-lg"
          href="#"
          style={{
            width: "90%",
            textAlign: "left",
            margin: " 10px 5%",
            backgroundColor: "rgb(40,103,178)",
            borderRadius: "0px",
            color: "white",
          }}
        >
          <LinkedinOutlined
            style={{
              position: "relative",
              top: "-4px",
              marginRight: "10px",
            }}
          />
          Get Started with Linkedin
        </a>
        <form>
          <p>
            Email
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </p>
          <input
            type="text"
            id="email"
            placeholder="you@example.com"
            className="form-control"
            required
          />

          <p>
            Password
            <span
              style={{
                color: "red",
              }}
            >
              *
            </span>
          </p>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            className="form-control"
            required
          />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a className="btn btn-primary btn-lg" onClick={log}>
              CONTINUE{" "}
            </a>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
};

export default Login;
