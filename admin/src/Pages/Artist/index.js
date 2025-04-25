import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import {
  deleteApihandler,
  getApihandler,
  putApihandler,
} from "../../Apihandler";
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import swal from "sweetalert";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Artist() {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getArtist();
  }, []);
  //   ***** get artist *******
  const getArtist = async () => {
    const res = await getApihandler("/getAllArtist");
    console.log("get all artist api res is --->", res);
    if (res.status === 200) {
      setData(res.data);
    }
  };
  //   ******* delete artist ********
  const deleteArtist = async (id) => {
    const res = await deleteApihandler(`/deleteArtist/${id}`);
    console.log("delete api res --->", res);
    if (res.status === 200) {
      swal({
        icon: "success",
        title: "Artist Delete successfully",
      });
      getArtist();
    } else {
      swal({
        icon: "error",
        title: "Please Try Again",
        text: res.error.response.data.message,
      });
    }
  };

  //   ******* update artist ********
  const [index, setIndex] = useState("");
  const [artistid, setArtistId] = useState("");
  const [name, setName] = useState("");
  const [countrycode, setCountryCode] = useState("");
  const [mobileno, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (index !== null && data[index]) {
      const { user_FullName, country_code, mobile_no } = data[index] || {};
      setName(user_FullName || "");
      setCountryCode(country_code || "");
      setMobileNumber(mobile_no || "");
    }
  }, [index, data]);

  const updateArtist = async () => {
    const data = {
      user_FullName: name,
      country_code: countrycode,

      mobile_no: mobileno,
    };
    const res = await putApihandler(`/editArtist/${artistid}`, data);
    console.log("update api res is---->", res);
    if (res.status === 200) {
      swal({
        icon: "success",
        title: "Artist Updated Successfully",
      });
      setOpen(false);
      getArtist();
    } else {
      swal({
        icon: "error",
        title: "Please Try Again",
        text: res.error.response.data.message,
      });
    }
  };
  return (
    <AdminLayout>
      <h1>Artist</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Artist Name</TableCell>
              <TableCell>Artist Email</TableCell>
              <TableCell>Artist Number</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((artist, index) => (
              <TableRow
                key={artist.user_FullName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {artist.user_FullName}
                </TableCell>
                <TableCell>{artist.user_Email}</TableCell>
                <TableCell>{artist.mobile_no}</TableCell>
                <TableCell>
                  <DeleteIcon
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteArtist(artist._id);
                        }
                      });
                    }}
                    color="error"
                  />
                  <EditIcon
                    onClick={() => {
                      setArtistId(artist._id);
                      setIndex(index);
                      setOpen(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2>Edit User</h2>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Country Code"
            fullWidth
            margin="normal"
            value={countrycode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
          <TextField
            label="Mobile Number"
            fullWidth
            margin="normal"
            value={mobileno}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={() => setOpen(false)} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={updateArtist}>
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </AdminLayout>
  );
}
