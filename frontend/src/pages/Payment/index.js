import React, { useState } from "react";
import Header from "../../components/Header";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { postApihandler } from "../../Apihandler";
import Swal from "sweetalert2";

export default function Payment() {
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?._id;
  const { id } = useParams();
  const navigate = useNavigate();
  const PayNow = async (e) => {
    e.preventDefault();

    if (!cardHolderName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      Swal.fire({
        icon: "error",
        title: "All fields are required",
      });
      return;
    }

    const data = {
      user_Id: userId,
      art_Id: id,
      cardHolderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
    };
    const res = await postApihandler("/buyArt", data);
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
      });
    }
    navigate("/buyarts");
  };

  return (
    <>
      <Header />
      <Card
        sx={{
          maxWidth: 500,
          margin: "auto",
          mt: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Art Booking & Payment
          </Typography>
          <form onSubmit={PayNow}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Holder Name"
                  name="cardHolderName"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // remove non-numeric characters
                    setCardNumber(value.slice(0, 16)); // limit to 16 digits
                  }}
                  inputProps={{
                    maxLength: 16,
                    inputMode: "numeric", // mobile keyboards show numbers
                  }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Month"
                  name="expiryMonth"
                  type="number"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Year"
                  name="expiryYear"
                  type="number"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // remove non-numeric characters
                    setCvv(value.slice(0, 3)); // limit to 3 digits
                  }}
                  inputProps={{
                    maxLength: 3,
                    inputMode: "numeric", // better mobile experience
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Pay Now
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
