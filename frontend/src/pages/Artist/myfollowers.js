import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getApihandler } from "../../Apihandler";

export default function MyFollowers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = localStorage.getItem("check");

    if (check === "user") {
      getFollowersUser();
    } else if (check === "artist") {
      getFollowersArtist();
    }
  }, []);

  const getFollowersUser = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userid = userData._id;

      const res = await getApihandler(`/getFollowersByUserId/${userid}`);

      if (res?.following) {
        setData(res.following);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching user followers:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const getFollowersArtist = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const artistid = userData._id;

      const res = await getApihandler(`/getFollowersByArtistId/${artistid}`);

      if (res.status === 200) {
        setData(res.followers);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching artist followers:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          {loading ? (
            <p>Loading followers...</p>
          ) : data && data.length > 0 ? (
            data.map((follower) => (
              <div key={follower._id} className="col-md-3 col-sm-6 mb-4">
                <div
                  style={{
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    padding: "20px",
                    borderRadius: "8px",
                    textAlign: "center",
                    backgroundColor: "#fff",
                  }}
                >
                  <h5 style={{ fontWeight: "600" }}>
                    {follower.user_FullName || "No Name"}
                  </h5>
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    {follower.user_Email || "No Email"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No followers found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
