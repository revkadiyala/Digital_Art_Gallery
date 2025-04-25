import React, { useEffect, useState } from "react";
import { getApihandler, postApihandler } from "../../Apihandler";
import Header from "../../components/Header";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import Swal from "sweetalert2";
import swal from "sweetalert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
export default function BuyArts() {
  const [buyArts, setBuyArts] = useState([]);
  useEffect(() => {
    getBuyArts();
  }, []);
  const getBuyArts = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userid = userData._id;
    const res = await getApihandler(`/getBuyArtByUserId/${userid}`);
    if (res.status === 200) {
      setBuyArts(res.data);
    }
  };
  //   ********  ratings api *************
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedArtId, setSelectedArtId] = useState(null);
  const handleOpen = (artId) => {
    setSelectedArtId(artId); // set the artId when opening modal
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRating(0);
    setReviewText("");
    setSelectedArtId(null);
  };

  const handleSubmit = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userid = userData._id;
    const data = {
      userId: userid,
      artId: selectedArtId,
      rating: rating,
      reviewText: reviewText,
    };
    const res = await postApihandler("/submitReview", data);

    if (res.status === 200) {
      Swal.fire({
        title: "Review Submitted Successfully",
        icon: "success",
      });
    } else {
      swal(
        "Error",
        res.error.response.data.message || "An unknown error occurred.",
        "error"
      );
    }
    handleClose();
  };
  return (
    <>
      <Header />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Purchased Arts
        </Typography>
        <Grid container spacing={3}>
          {buyArts.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  {item.art_Id?.photos && item.art_Id.photos.length > 0 ? (
                    <img
                      src={`http://localhost:80/${item.art_Id.photos[0].replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={item.art_Id?.art_name || "Art Image"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        backgroundColor: "#eee",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      No Image Available
                    </div>
                  )}

                  <Typography variant="h6" gutterBottom>
                    {item.art_Id?.art_name || "Art Name"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Buyer:</strong>{" "}
                    {item.user_Id?.user_FullName || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Price:</strong> ₹{item.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Payment Status:</strong> {item.paymentStatus}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 2 }}
                  >
                    <strong>Card Holder:</strong>{" "}
                    {item.cardDetails?.cardHolderName || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Card Number:</strong> **** **** ****{" "}
                    {item.cardDetails?.cardNumber.slice(-4)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Expiry:</strong> {item.cardDetails?.expiryMonth}/
                    {item.cardDetails?.expiryYear}
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    sx={{ mt: 2 }}
                    color="textSecondary"
                  >
                    Purchased on:{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Typography>
                  <Button
                    startIcon={<GradeIcon sx={{ color: "orange" }} />}
                    sx={{
                      backgroundColor: "rgb(201, 55, 55)",
                      color: "white",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleOpen(item.art_Id)}
                  >
                    Review & Ratings
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* ************ ratings modal ************* */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            Submit Your Review
          </Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            Submit Review
          </Button>
        </Box>
      </Modal>
    </>
  );
}
