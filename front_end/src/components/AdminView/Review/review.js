import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Modal_Admin from "../modal/modal";
import EditReview from "../modal/editReview";

const Reviews = () => {
  const [reviews, setreviews] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [node, setnode] = useState(null);
  const [showModalEditReview, setshowModalEditReview] = useState(false);
  const [modalMsg, setmodalMsg] = useState("");
  const get_reviews = async () => {
    await fetch(`http://localhost:9000/get-all-reviews`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        // "Content-Type": "application/json;charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setreviews([...data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteReview = async (node) => {
    setshowModal(true);
    const result = await fetch(`http://localhost:9000/delete-review`, {
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
          get_reviews();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    get_reviews();
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
        Reviews
      </h2>
      <Modal_Admin
        show={showModal}
        onHide={() => setshowModal(false)}
        message={modalMsg}
        setmessage={() => setmodalMsg("")}
      />
      <EditReview
        show={showModalEditReview}
        onHide={() => setshowModalEditReview(false)}
        node={node}
        setnode={setnode}
        get_reviews={get_reviews}
      />

      <br />
      <br />
      {reviews &&
        reviews.map((node) => {
          return (
            <div
              key={node.id}
              style={{
                position: "relative",
                width: "70vw",
                margin: "auto",
                backgroundColor: "#52575d",
                // height: "60px",
              }}
            >
              <div style={{ display: "flex", gap: "50%" }}>
                <h2
                  style={{
                    color: "white",
                  }}
                >
                  From: {node.by_user}
                </h2>
                <h2
                  style={{
                    color: "white",
                  }}
                >
                  To: {node.for_user}
                </h2>
              </div>
              <p
                style={{
                  color: "white",
                  marginTop: "20px",
                }}
              >
                DESCRIPTION:
              </p>
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                }}
              >
                {node.description}
              </p>

              <div div className="row">
                <div className="col-10"></div>
                <div className="col-2">
                  {" "}
                  <DeleteOutlined
                    style={{
                      cursor: "pointer",
                      margin: "20px",
                      color: "white",
                    }}
                    onClick={() => deleteReview(node)}
                  />
                  <EditOutlined
                    style={{
                      cursor: "pointer",
                      margin: "20px",
                      color: "white",
                    }}
                    onClick={() => {
                      setnode(node);
                      setshowModalEditReview(true);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      <div></div>
    </div>
  );
};

export default Reviews;
