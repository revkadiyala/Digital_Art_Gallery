import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Typography, IconButton, Grid, Avatar } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
export default function CollectionGallery() {
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: "Abstract Art",
      artworks: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    },
    {
      id: 2,
      name: "Modern Minimalism",
      artworks: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");

  // Function to handle new collection addition
  const handleAddCollection = () => {
    if (newCollectionName.trim() !== "") {
      const newCollection = {
        id: collections.length + 1,
        name: newCollectionName,
        artworks: [],
      };
      setCollections([...collections, newCollection]);
      setNewCollectionName("");
      setShowModal(false);
    }
  };

  // Function to delete a collection
  const handleDeleteCollection = (id) => {
    setCollections(collections.filter((collection) => collection.id !== id));
  };

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <Typography variant="h4">
              My Collections & Virtual Gallery
            </Typography>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={() => setShowModal(true)}>
              <Add /> Add Collection
            </Button>
          </Col>
        </Row>

        {/* Collection Display */}
        <Row>
          {collections.map((collection) => (
            <Col md={4} key={collection.id} className="mb-3">
              <Card>
                <Card.Body>
                  <Row>
                    <Col xs={10}>
                      <Typography variant="h6">{collection.name}</Typography>
                    </Col>
                    <Col xs={2} className="text-end">
                      <IconButton
                        onClick={() => handleDeleteCollection(collection.id)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </Col>
                  </Row>
                  <Grid container spacing={1} className="mt-2">
                    {collection.artworks.map((art, index) => (
                      <Grid item xs={4} key={index}>
                        <Avatar
                          src={art}
                          variant="rounded"
                          sx={{ width: "100%", height: "auto" }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Add Collection Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Collection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Collection Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter collection name"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleAddCollection}>
              Add Collection
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </>
  );
}
