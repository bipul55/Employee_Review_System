import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LogedUser } from "../../App";

const My_Reviews = () => {
  const [user, setuser] = useContext(LogedUser);
  const [Reviews, setReviews] = useState([]);

  //   get the pending given review
  const get_Reviews = async (email) => {
    console.log(email, "email");
    const result = await fetch(
      `http://localhost:9000/get-my-reviews/${email}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          // "Content-Type": "application/json;charset=utf-8",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReviews([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    get_Reviews(user.email);
  }, []);

  return (
    <div style={{ marginTop: "100px" }}>
      <h4
        style={{
          textAlign: "center",
        }}
      >
        My Reviews
      </h4>

      {Reviews && Reviews.length > 0 ? (
        <div>
          {Reviews.map((node) => {
            return (
              <div
                key={node.id}
                style={{
                  position: "relative",
                  width: "70vw",
                  margin: "auto",
                  // backgroundColor: "#52575d",
                  // height: "60px",
                  padding: "10px",
                  boxShadow: " 0 1rem 3rem rgba(0, 0, 0, 0.175)",
                }}
              >
                <div style={{ display: "flex", gap: "50%", flexWrap: "wrap" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      textAlign: "left",
                    }}
                  >
                    From: {node.by_user}
                  </p>
                </div>

                <p
                  style={{
                    textAlign: "left",
                  }}
                >
                  {node.description}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p
            style={{
              textAlign: "center",
            }}
          >
            No review{" "}
          </p>
        </div>
      )}
    </div>
  );
};
export default My_Reviews;
