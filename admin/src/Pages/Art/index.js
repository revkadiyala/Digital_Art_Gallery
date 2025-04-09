import AdminLayout from "../../Layout/AdminLayout";
import {
  deleteApihandler,
  getApihandler,
  postApihandler,
  putApihandler,
} from "../../Apihandler";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
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
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
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

export default function Art() {
  const [artistName, setArtistName] = useState("");
  const [artName, setArtName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [artid, setArtId] = useState("");
  console.log("art id is ----->", artid);
  const [index, setIndex] = useState("");
  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files)); // Convert FileList to an array
  };

  // ******* get category api *******
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getCatgory();
  }, []);
  const getCatgory = async () => {
    const res = await getApihandler("/getAllCategory");
    console.log("res", res);

    if (res.message === "Categories get successfully") {
      setCategories(res.data);
    }
  };

  //   ****** get art ********
  const [arts, setArts] = useState([]);
  useEffect(() => {
    getArt();
  }, []);
  const getArt = async () => {
    const res = await getApihandler("/getArt");

    if (res.message === "Arts retrieved successfully") {
      setArts(res.arts);
    }
  };

  //   ******* delete art *********

  const deleteArt = async (id) => {
    const res = await deleteApihandler(`/deleteArt/${id}`);
    if (res.message === "Art deleted successfully") {
      Swal.fire({
        icon: "success",
        text: "Art  Deleted successfully!",
      });
      getArt();
    }
  };

  //   ******** update art *********

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  useEffect(() => {
    if (index !== "") {
      const { artist_name, art_name, price, description, category } =
        arts[index] || {};
      setArtistName(artist_name || "");
      setArtName(art_name || "");
      setPrice(price || "");
      setDescription(description || "");
      setSelectedCategory(category || "");
    }
  }, [index]);
  const updateArt = async () => {
    const formData = new FormData();
    formData.append("artist_name", artistName);
    formData.append("art_name", artName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", selectedCategory);

    photos.forEach((photo) => {
      formData.append("photos", photo); // Append each file correctly
    });
    const res = await putApihandler(`/updateArt/${artid}`, formData);
    if (res.message === "Art updated successfully") {
      Swal.fire({
        icon: "success",
        text: "Art  Updated successfully!",
      });
      setOpen1(false);
      getArt();
    }
  };

  // ******* handle status api *******
  const handleUpdateStatus = async (artId, currentStatus) => {
    const data = {
      artId: artId,
      status: currentStatus,
    };
    const res = await postApihandler("/updateArtStatus", data);
    console.log("res", res);

    if (res.art) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Art status updated successfully!",
      });
      getArt(); // Refresh the art list
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: res.message || "Failed to update status",
      });
    }
  };
  return (
    <AdminLayout>
      <TableContainer component={Paper} className="mt-4">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Art Name</TableCell>
              <TableCell>Artist Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Photos</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arts.map((art, index) => (
              <TableRow
                key={art.art_name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {art.art_name || "N/A"}
                </TableCell>
                <TableCell>{art.artist_name || "N/A"}</TableCell>
                <TableCell>{art.price || "N/A"}</TableCell>
                <TableCell>{art.description || "N/A"}</TableCell>
                <TableCell>{art.category || "N/A"} </TableCell>
                <TableCell>
                  {art.photos && art.photos.length > 0 && (
                    <img
                      src={`http://localhost:80/${art.photos[0].replace(
                        "\\",
                        "/"
                      )}`}
                      alt={art.art_name}
                      width="100px"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
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
                          deleteArt(art._id);
                        }
                      });
                    }}
                    color="error"
                  >
                    <DeleteIcon sx={{ color: "black" }} />
                  </IconButton>
                  <EditIcon
                    onClick={() => {
                      setArtId(art._id);
                      setIndex(index);
                      setOpen1(true);
                    }}
                  />
                  <Link to={`/artdetail/${art._id}`} style={{ color: "black" }}>
                    <VisibilityIcon />
                  </Link>
                </TableCell>
                <TableCell>
                  {art.status === 1 ? (
                    <Button
                      variant="contained" // Changed from "outlined" to "contained" for better visibility
                      color="error"
                      onClick={() => handleUpdateStatus(art._id, 0)}
                      sx={{
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      Inactive
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleUpdateStatus(art._id, 1)}
                      sx={{
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      Active
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* {/ ******** update art *********** /} */}

      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h6>Update Art</h6>
          <TextField
            label="Artist Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
          <TextField
            label="Art Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={artName}
            onChange={(e) => setArtName(e.target.value)}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-4">
            <input type="file" multiple onChange={handleFileChange} />
          </div>
          <div className="mt-4">
            <label>Select Category</label>
            <div className="mt-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-control"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option
                    key={category.category_name}
                    value={category.category_name}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button variant="contained" className="mt-3" onClick={updateArt}>
            Update Art
          </Button>
        </Box>
      </Modal>
    </AdminLayout>
  );
}
