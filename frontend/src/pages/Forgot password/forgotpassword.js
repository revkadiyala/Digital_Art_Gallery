import React, { useState } from "react";
import Header from "../../components/Header";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { postApihandler } from "../../Apihandler";
import swal from "sweetalert";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    const res = await postApihandler("/userEmailVerify", data);
    console.log("email veififcatiion res--->", res);
    if (res.status === 200) {
      swal("Email exists");
      navigate("/reset-passwrod");
    } else {
      swal(
        "Error",
        res.error.response.data.message || "An unknown error occurred.",
        "error"
      );
    }
  };
  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
            Forgot Password
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            mb={3}
            color="text.secondary"
          >
            Enter your registered email address and we’ll send you a link to
            reset your password.
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              sx={{ mb: 3 }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5, fontWeight: "bold" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
