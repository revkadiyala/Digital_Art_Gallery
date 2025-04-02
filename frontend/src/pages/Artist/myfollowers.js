import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getApihandler } from "../../Apihandler";

export default function MyFollowers() {
  const [data, setData] = useState([]);
  console.log("data is --->", data);
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
    }
  };

  const getFollowersArtist = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const artistid = userData._id;
      const res = await getApihandler(`/getFollowersByArtistId/${artistid}`);

      if (res?.following) {
        setData(res.following);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching artist followers:", error);
      setData([]);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          {data && data.length >= 0 ? (
            data.map((follower) => (
              <div className="col-2">
                <div
                  key={follower._id}
                  style={{
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    padding: "20px",
                    borderRadius: "8px",
                  }}
                >
                  <h5> {follower.user_FullName}</h5>
                  <p> {follower.user_Email}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No followers found.</p>
          )}
        </div>
      </div>
    </>
  );
}
