import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  deleteApihandler,
  getApihandler,
  putApihandler,
} from "../../Apihandler";
import { Box, Button, Modal, TextField } from "@mui/material";
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
export default function MyArts() {
  const [arts, setArts] = useState([]);
  console.log("arts is ---->", arts);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const artistid = userData._id;
  useEffect(() => {
    getMyArts();
  }, []);
  const getMyArts = async () => {
    const res = await getApihandler(`/getArtsByArtist?artistId=${artistid}`);
    console.log("get arts by artist --->", res);
    if (res.status === 200) {
      setArts(res.arts || []);
    }
  };
  // ******** delete arts **********
  const deleteArt = async (id) => {
    const res = await deleteApihandler(`/deleteArt/${id}`);
    console.log("delete art api response is ---->", res);
    if (res.message === "Art deleted successfully") {
      Swal.fire({
        icon: "success",
        text: "Art  Deleted successfully!",
      });
      getMyArts();
    }
  };
  // ********* update arts *******
  // ******** get category api ********
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getCatgory();
  }, []);
  const getCatgory = async () => {
    const res = await getApihandler("/getAllCategory");

    if (res.message === "Categories get successfully") {
      setCategories(res.data);
    }
  };
  const [artistName, setArtistName] = useState("");
  const [artName, setArtName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [artid, setArtId] = useState("");

  const [index, setIndex] = useState("");
  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files)); // Convert FileList to an array
  };
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
    console.log("update api response is ---->", res);
    if (res.message === "Art updated successfully") {
      Swal.fire({
        icon: "success",
        text: "Art  Updated successfully!",
      });
      setOpen1(false);
      getMyArts();
    } else {
      swal(
        "Error",
        res.error.response.data.error || "An unknown error occurred.",
        "error"
      );
    }
  };

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <h1>My Arts</h1>

        {arts.length === 0 ? (
          <p>No arts found.</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {arts.map((art, index) => (
              <div
                key={art._id}
                style={{
                  flex: "0 0 25%",
                  maxWidth: "25%",
                  boxSizing: "border-box",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: "#f9f9f9",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    overflow: "hidden",
                    marginBottom: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={`http://localhost:80/${art.photos[0].replace(
                      /\\/g,
                      "/"
                    )}`}
                    alt={art.art_name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h3 style={{ margin: "10px 0 5px" }}>{art.art_name}</h3>
                <p style={{ fontSize: "14px", color: "#666", margin: "5px 0" }}>
                  By {art.artist_name}
                </p>
                <p style={{ fontWeight: "bold", margin: "5px 0" }}>
                  ${art.price}
                </p>
                <p style={{ fontSize: "13px", color: "#999", margin: "5px 0" }}>
                  {art.category}
                </p>
                <p
                  style={{ fontSize: "12px", color: "#aaa", marginTop: "10px" }}
                >
                  {art.description}
                </p>
                <div className="d-flex">
                  <Button
                    variant="outlined"
                    sx={{ marginRight: "20px" }}
                    onClick={() => {
                      setArtId(art._id);
                      setIndex(index);
                      setOpen1(true);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
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
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* ********* update art ************ */}

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
      </div>
    </>
  );
}
