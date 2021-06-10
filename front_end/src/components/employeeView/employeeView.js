import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LogedUser } from "../../App";

const EmployeeView = () => {
  const [user, setuser] = useContext(LogedUser);
  const [pendingReviews, setpendingReviews] = useState([]);

  //   get the pending given review
  const get_pendingReviews = async (email) => {
    const result = await fetch(
      `http://localhost:9000/get_assigned_reviews_task`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ email: email }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setpendingReviews([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // to post the reviews
  const post_reviews = async (node) => {
    const review = document.getElementById(`review${node.id}`).value;
    if (!review) {
      window.alert("Enter the review first");
    } else {
      const result = await fetch(`http://localhost:9000/post_review`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          id: node.id,
          for_user: node.for_user,
          by_user: node.by_user,
          description: review,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            alert("Review Successively posted");
            get_pendingReviews(user.email);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload(false);
  };
  useEffect(() => {
    get_pendingReviews(user.email);
  }, []);

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Your Assigned Reviews
      </h1>
      <div
        className="btn btn-md btn-dark"
        style={{
          position: "absolute",
          right: "20px",
          top: "20px",
        }}
        onClick={logout}
      >
        Logout
      </div>
      {pendingReviews && pendingReviews.length > 0 ? (
        <div>
          {pendingReviews.map((node) => {
            return (
              <div
                key={node.id}
                style={{
                  position: "relative",
                  width: "70vw",
                  margin: "auto",
                  backgroundColor: "#52575d",
                  //   height: "60px",
                }}
              >
                <div>
                  <h1
                    style={{
                      color: "white",
                      margin: "40px",
                    }}
                  >
                    Email:<label>{node.for_user}</label>
                  </h1>
                </div>
                <div
                  style={{
                    width: "80%",
                    margin: "auto",
                  }}
                >
                  <textarea
                    id={`review${node.id}`}
                    style={{
                      width: "100%",
                      height: "300px",
                      borderRadius: "10px",
                      border: "0px",
                      backgroundColor: "#ceecfb",
                      resize: "none",
                    }}
                    placeholder="Review..."
                  />
                </div>

                <div
                  className="btn btn-primary btn-lg"
                  style={{
                    position: "relative",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  onClick={() => post_reviews(node)}
                >
                  Post
                </div>
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
            No pending review{" "}
          </p>
        </div>
      )}
    </div>
  );
};
export default EmployeeView;
