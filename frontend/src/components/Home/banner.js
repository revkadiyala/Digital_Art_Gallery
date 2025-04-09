import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import sliderimg1 from "../../Images/sliderimg1.jpg";
import sliderimg2 from "../../Images/sliderimg2.jpg";
import sliderimg3 from "../../Images/sliderimg3.jpg";
import "../../Css/home.css";
import { Box, Modal, TextField } from "@mui/material";
import { getApihandler, postApihandler } from "../../Apihandler";
import Swal from "sweetalert2";
import swal from "sweetalert";

import { AddCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@mui/material";
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

export default function Banner() {
  // ************* add art api **************
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [artistName, setArtistName] = useState("");
  const [artName, setArtName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [addedby, setAddedBy] = useState("Vendor");
  const [isArtistLoggedIn, setIsArtistLoggedIn] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log("userdata", userData);
  const artistid = userData._id;

  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files)); // Convert FileList to an array
  };
  // ******** get category api ********
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log("select category is --->", selectedCategory);
  useEffect(() => {
    getCatgory();
  }, []);
  const getCatgory = async () => {
    const res = await getApihandler("/getAllCategory");
    console.log("get category api response is ---->", res);
    if (res.message === "Categories get successfully") {
      setCategories(res.data);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const artistName = userData.user_FullName;
    if (artistName) {
      setArtistName(userData.user_FullName);
    }
  }, []);

  const addArt = async () => {
    const formData = new FormData();
    formData.append("artistId", artistid);
    formData.append("artist_name", artistName);
    formData.append("art_name", artName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    formData.append("addedBy", addedby);
    photos.forEach((photo) => {
      formData.append("photos", photo); // Append each file correctly
    });
    const res = await postApihandler("/addArt", formData);
    console.log("add art api response is ---->", res);
    if (res.message === "Art added successfully") {
      Swal.fire({
        icon: "success",
        text: "Art  added successfully!",
      });
      setOpen(false);
    } else {
      swal(
        "Error",
        res.error.response.data.error || "An unknown error occurred.",
        "error"
      );
    }
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isArtistLoggedIn");

    setIsArtistLoggedIn(loggedIn);
  }, []);

  // ******* search functionality **********

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(
      `/searcharts?price=${encodeURIComponent(
        price
      )}&category=${encodeURIComponent(selectedCategory)}`
    );
  };
  return (
    <div>
      <section className="digital_bg_img">
        <Container>
          <Row>
            <Col
              md={6}
              className="d-flex align-items-center justify-content-center"
            >
              {isArtistLoggedIn === "true" ? (
                <div
                  style={{
                    background: "linear-gradient(135deg, #2e2e2e, #1a1a1a)",
                    padding: "30px",
                    borderRadius: "15px",
                    textAlign: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    maxWidth: "400px",
                  }}
                >
                  <h3
                    style={{
                      color: "#fff",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Showcase Your Art
                  </h3>
                  <p
                    style={{
                      color: "#ccc",
                      fontSize: "14px",
                      marginBottom: "20px",
                    }}
                  >
                    Upload your masterpiece and share it with the world.
                  </p>

                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      borderRadius: "20px",
                      padding: "10px 25px",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Add Art
                  </Button>
                </div>
              ) : (
                <div
                  style={{
                    background: "#2e2e2e",
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    maxWidth: "500px",
                    color: "white",
                  }}
                >
                  <h5>Search Art</h5>
                  <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    sx={{
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                      "& input[type=number]": {
                        MozAppearance: "textfield",
                      },
                      "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                    }}
                  />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="form-control mt-2"
                    style={{ padding: "10px", borderRadius: "5px" }}
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

                  <Button
                    variant="contained"
                    className="mt-3"
                    style={{
                      backgroundColor: "rgb(201, 55, 55)",
                      border: "none",
                      padding: "7px 20px",
                      color: "white",
                      width: "100%",
                    }}
                    onClick={() => handleSearch()}
                  >
                    Search
                  </Button>
                </div>
              )}
            </Col>

            <Col md={6} className="mt-5">
              <Carousel>
                <Carousel.Item>
                  <img src={sliderimg1} width="100%" height="100%" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src={sliderimg2} width="100%" height="100%" />
                </Carousel.Item>
                <Carousel.Item>
                  <img src={sliderimg3} width="100%" height="100%" />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
        {/* ******** add art ********* */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h6>Add Art</h6>
            <TextField
              label="Artist Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
            <TextField
              label="Added By"
              variant="outlined"
              fullWidth
              margin="normal"
              value={addedby}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "Admin" || value === "Vendor" || value === "") {
                  setAddedBy(value);
                }
              }}
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
            <Button
              variant="contained"
              className="mt-3"
              onClick={addArt}
              style={{
                backgroundColor: "rgb(201, 55, 55)",
                border: "none",
                padding: "7px 20px",
                color: "white",
              }}
            >
              Add Art
            </Button>
          </Box>
        </Modal>
      </section>
    </div>
  );
}
