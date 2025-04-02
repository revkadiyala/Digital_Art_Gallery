import React, { useEffect, useState } from "react";
import { getApihandler, postApihandler } from "../../Apihandler";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

import { AiOutlineLike, AiOutlineMessage } from "react-icons/ai";

export default function AllArt() {
  const [art, setArt] = useState([]);
  const [comments, setComments] = useState("");
  useEffect(() => {
    getAllArt();
  }, []);

  const getAllArt = async () => {
    const res = await getApihandler("/getArt");
    if (res.message === "Arts retrieved successfully") {
      setArt(res.arts);
    }
  };

  const addComment = async (artId) => {
    const storedUser = localStorage.getItem("userData");
    const user = JSON.parse(storedUser);
    const item = {
      userId: user._id,
      text: comments,
    };
    try {
      const response = await postApihandler(`/artComment/${artId}`, item);
      console.log("response", response);

      if (response.message === "Comment added successfully") {
        setComments("");
        getAllArt();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLike = async (artId) => {
    const storedUser = localStorage.getItem("userData");
    const user = JSON.parse(storedUser);
    const item = {
      userId: user._id,
    };
    try {
      const response = await postApihandler(`/artLike/${artId}`, item);
      console.log("response", response);

      if (response.message === "Liked successfully") {
        getAllArt();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="container mx-auto mt-8 px-4">
        <h3 className="text-center text-2xl font-semibold mb-6">All Arts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {art.length > 0 ? (
            art.map((item) => (
              <div
                key={item._id}
                style={{ padding: "10px" }}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Link to={`/artdetail/${item._id}`} className="block">
                  <img
                    src={
                      item.photos && item.photos.length > 0
                        ? `http://localhost:80/${item.photos[0].replace(
                            "\\",
                            "/"
                          )}`
                        : "https://via.placeholder.com/300?text=No+Image"
                    }
                    alt={item.art_name || "No Image Available"}
                    style={{ width: "50%" }}
                  />
                </Link>

                <div className="p-4">
                  <h5 className="text-lg font-medium">{item.artist_name}</h5>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.description}
                  </p>
                  <p className="font-bold text-lg mt-2">Price ₹{item.price}</p>

                  {/* Like and Comment Buttons */}
                  <div className="border-t mt-3 pt-3 flex justify-around items-center text-gray-500">
                    <button
                      style={{ border: "none", background: "none" }}
                      className="flex items-center gap-1 text-yellow-500 hover:text-yellow-600"
                      onClick={() => handleLike(item._id)}
                    >
                      <AiOutlineLike style={{ fontSize: "30px" }} />
                      <span>Like {item.likes ? item.likes.length : 0}</span>
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                      style={{ border: "none", background: "none" }}
                      className="flex items-center gap-1 hover:text-gray-700"
                    >
                      <AiOutlineMessage style={{ fontSize: "30px" }} />
                      <span>
                        Comment {item.comments ? item.comments.length : 0}
                      </span>
                    </button>
                  </div>
                  {/* Add Comment Input */}
                  <div className="mt-2 flex">
                    <input
                      type="text"
                      style={{ width: "50%" }}
                      placeholder="Write a comment..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />
                    <button
                      style={{ border: "none", marginLeft: "10px" }}
                      onClick={() => addComment(item._id)}
                    >
                      Add
                    </button>
                  </div>
                  {/* Comments Section */}
                  {item.comments && item.comments.length > 0 && (
                    <div style={{ marginTop: "12px" }}>
                      <h6 style={{ fontWeight: "600", color: "#374151" }}>
                        Comments:
                      </h6>

                      {/* Scrollable Comments Container */}
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          style={{
                            maxHeight: "150px",
                            width: "50%",
                            // Set max height to enable scrolling
                            overflowY: "auto",
                            border: "1px solid #ccc",
                            padding: "10px",
                            borderRadius: "8px",
                            backgroundColor: "#f9f9f9",
                          }}
                        >
                          {item.comments.map((comment, index) => (
                            <div
                              key={index}
                              style={{
                                borderBottom: "1px solid #ddd",
                                padding: "5px 0",
                              }}
                            >
                              <p
                                style={{
                                  textAlign: "start",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  color: "#333",
                                }}
                              >
                                {comment.userName}:{" "}
                                <span style={{ color: "#666" }}>
                                  {comment.text}
                                </span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4">No arts available.</p>
          )}
        </div>
      </div>
    </>
  );
}
