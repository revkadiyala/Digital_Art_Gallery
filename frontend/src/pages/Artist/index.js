import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Col, Container, Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getApihandler, postApihandler } from "../../Apihandler";
import Swal from "sweetalert2";

export default function Artist() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getArtist();
  }, []);

  // Fetch all artists
  const getArtist = async () => {
    try {
      const res = await getApihandler("/getAllArtist");
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log("Error fetching artists", error);
    }
  };

  // Follow or Unfollow Artist
  const FollowArtist = async (artistId) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?._id;

      const requestData = { userId, artistId };

      const res = await postApihandler("/followArtist", requestData);

      if (res.message === "Followed the artist successfully.") {
        Swal.fire({
          icon: "success",
          title: "Artist followed successfully",
        });
      } else if (res.message === "Unfollowed the artist successfully.") {
        Swal.fire({
          icon: "success",
          title: "Artist unfollowed successfully",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
        });
      }

      // Update the local state without refetching all artists
      setData((prevData) =>
        prevData.map((artist) =>
          artist._id === artistId
            ? { ...artist, isFollowing: !artist.isFollowing }
            : artist
        )
      );
    } catch (error) {
      console.log("Error following/unfollowing artist", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <h3 className="text-center text-2xl font-semibold mb-6">All Artists</h3>
        <Row>
          {data.map((val) => (
            <Col md={3} key={val._id} style={{ marginTop: "10px" }}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    Artist:
                    <span style={{ fontWeight: "700" }}>
                      {val.user_FullName}
                    </span>
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    variant={val.isFollowing ? "contained" : "outlined"}
                    color={val.isFollowing ? "error" : "primary"}
                    onClick={() => FollowArtist(val._id)}
                  >
                    {val.isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                </CardActions>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
