import React, { useState } from "react";
import Header from "../../components/Header";
import { postApihandler } from "../../Apihandler";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      newPassword: newPassword,
    };
    const res = await postApihandler("/userForgetPasswordByEmail", data);
    console.log("reset passwrod res---->", res);
    if (res.status === 200) {
      swal("Password updated successfully");
      navigate("/");
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
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, p: 4, border: "1px solid #ccc", borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Update Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
              Update Password
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}
