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
        setmessage={setmodalMsg}
        setshowModal={() => setshowModal(true)}
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
                <p
                  style={{
                    fontSize: "16px",
                    textAlign: "left",
                    fontWeight: "500",
                  }}
                >
                  To: {node.for_user}
                </p>
              </div>
              <p
                style={{
                  marginTop: "20px",
                }}
              >
                DESCRIPTION:
              </p>
              <p
                style={{
                  textAlign: "left",
                }}
              >
                {node.description}
              </p>

              <div div className="row">
                <div className="col-7"></div>
                <div className="col-5">
                  <EditOutlined
                    className="icon"
                    onClick={() => {
                      setnode(node);
                      setshowModalEditReview(true);
                    }}
                  />
                  <DeleteOutlined
                    className="icon"
                    onClick={() => deleteReview(node)}
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
