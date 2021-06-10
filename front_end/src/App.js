import React, { useState, useEffect } from "react";
import Router from "./router";
export const LogedUser = React.createContext();
const jwt = require("jsonwebtoken");

function App() {
  const [user, setuser] = useState({});
  const key =
    "198c931d160e3bc6a9e2cd168279dc60f901c3aba24d8ab0090e114801ffc06bee84941eac8d115524581c7d5a3daedc09043ed1695a85e028606416a692d3cc";
  useEffect(() => {
    // for login user
    var loggedInUser = localStorage.getItem("user");
    loggedInUser = JSON.parse(loggedInUser);
    var temp = user;
    if (loggedInUser) {
      jwt.verify(loggedInUser, key, (err, user) => {
        temp.email = user.email;
        temp.name = user.name;
        temp.isUser = true;
        temp.data = "data";
        if (user.isEmployee === 0) {
          temp.isEmployee = false;
        } else {
          temp.isEmployee = true;
        }
      });
    } else {
      temp.isUser = false;
      temp.data = "data";
    }

    setuser({ ...temp });
  }, []);
  return (
    <div className="App">
      <LogedUser.Provider value={[user, setuser]}>
        <Router />
      </LogedUser.Provider>
    </div>
  );
}

export default App;
