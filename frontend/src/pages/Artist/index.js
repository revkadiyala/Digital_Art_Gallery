import React, { useState } from "react";
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
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
export default function Artist() {
  const [data, setData] = useState([]);

  const getArtist = async () => {
    const res = await getApihandler("/getAllArtist");

    if (res.status === 200) {
      setData(res.data);
    }
  };

  useState(() => {
    getArtist();
  }, []);

  // ******** follow api *********

  const FollowArtist = async (artistId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    const data = {
      userId,
      artistId,
    };

    const res = await postApihandler("/followArtist", data);
    if (res.message === "Followed the artist successfully.") {
      Swal.fire({
        icon: "success",
        title: "Artist followed successfully",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Artist Unfollowed successfully",
      });
    }
  };
  return (
    <>
      <Header />
      <Container className="mt-5">
        <h3 className="text-center text-2xl font-semibold mb-6">All Artist</h3>
        <Row>
          {data.map((val) => {
            return (
              <>
                <Col md={3} style={{ marginTop: "10px" }}>
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
                    <CardActions className="d-flex justify-content-center">
                      <Button
                        variant="outlined"
                        sx={{
                          textTransform: "capitalize",
                          border: "1px solid black",
                          color: "black",
                        }}
                        onClick={() => FollowArtist(val._id)}
                      >
                        Follow
                      </Button>
                    </CardActions>
                  </Card>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
