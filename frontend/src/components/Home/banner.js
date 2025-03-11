import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import sliderimg1 from "../../Images/sliderimg1.jpg";
import sliderimg2 from "../../Images/sliderimg2.jpg";
import sliderimg3 from "../../Images/sliderimg3.jpg";
import "../../Css/home.css";
import { Box, Modal, TextField } from "@mui/material";
import { getApihandler, postApihandler } from "../../Apihandler";
import Swal from "sweetalert2";
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
  // const [artid, setArtId] = useState("");
  // const [index, setIndex] = useState("");
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
  const addArt = async () => {
    const formData = new FormData();
    formData.append("artist_name", artistName);
    formData.append("art_name", artName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", selectedCategory);

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
      // getArt();
    }
  };
  const [isArtistLoggedIn, setIsArtistLoggedIn] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem("isArtistLoggedIn") === "true";
    setIsArtistLoggedIn(loggedIn);
  }, []);
  return (
    <div>
      <section className="digital_bg_img">
        <Container>
          <Row>
            <Col
              md={6}
              className="d-flex align-items-center justify-content-center"
            >
              <div className=" ">
                {isArtistLoggedIn ? (
                  <Button
                    style={{
                      backgroundColor: "rgb(201, 55, 55)",
                      border: "none",
                      padding: "7px 20px",
                    }}
                    onClick={handleOpen}
                  >
                    Add Art
                  </Button>
                ) : (
                  <p style={{ color: "white" }}>Please log in to add art.</p>
                )}
              </div>
            </Col>
            <Col md={6} className="mt-5">
              <Carousel>
                <Carousel.Item>
                  <img src={sliderimg1} />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  {/* <ExampleCarouselImage text="Second slide" /> */}
                  <img src={sliderimg2} />
                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img src={sliderimg3} />
                  {/* <ExampleCarouselImage text="Third slide" /> */}
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
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
