import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getApihandler } from "../../Apihandler";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

export default function SellArts() {
  const [soldarts, setSoldArts] = useState([]);

  useEffect(() => {
    getSoldArts();
  }, []);
  const getSoldArts = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const artistid = userData._id;
    const res = await getApihandler(`/getArtistBuyArt/${artistid}`);

    if (res.status === 200) {
      setSoldArts(res.data);
    }
  };
  return (
    <>
      <Header />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Sold Arts
        </Typography>

        {soldarts.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No sold arts found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {soldarts.map((art) => (
              <Grid item xs={12} md={6} lg={4} key={art._id}>
                <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {art.art_Id?.art_name || "Unnamed Art"}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Price:</strong> ₹{art.price}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Buyer:</strong>{" "}
                      {art.user_Id?.user_FullName || "Unknown"}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Payment Status:</strong> {art.paymentStatus}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 1 }}
                    >
                      Purchased on:{" "}
                      {new Date(art.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}
