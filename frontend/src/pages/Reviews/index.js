import React, { useEffect, useState } from "react";
import { getApihandler } from "../../Apihandler";
import Header from "../../components/Header";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Rating,
  Typography,
} from "@mui/material";

export default function Reviews() {
  const check = localStorage.getItem("check");
  const [review, setReviews] = useState([]);
  useEffect(() => {
    if (check === "user") {
      getReviewsByUser();
    } else if (check === "artist") {
      getReviewsByArtist();
    }
  }, []);
  const getReviewsByArtist = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const artistid = userData._id;
    const res = await getApihandler(`/getArtistReviews/${artistid}`);
    if (res.status === 200) {
      setReviews(res.data);
    }
  };

  const getReviewsByUser = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userid = userData._id;
    const res = await getApihandler(`/getUserReviews/${userid}`);

    if (res.status === 200) {
      setReviews(res.data);
    }
  };
  return (
    <>
      <Header />
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ marginTop: 4 }}
      >
        Reviews
      </Typography>

      {review.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" color="text.secondary">
            No reviews found.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ padding: 3 }}>
          {review.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.artId?.art_name || "Untitled Art"}
                  </Typography>

                  <Rating value={item.rating} precision={0.5} readOnly />

                  <Typography variant="body2" color="text.secondary" mt={2}>
                    {item.reviewText}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
