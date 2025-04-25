import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getApihandler } from "../../Apihandler";
import { Button } from "@mui/material";

export default function ArtDetail() {
  const { id } = useParams();
  const [art, setArt] = useState("");

  useEffect(() => {
    getArtDetail();
  }, []);
  const getArtDetail = async () => {
    const res = await getApihandler(`/getArt/${id}`);

    if (res.message === "Success") {
      setArt(res.data);
    }
  };
  return (
    <>
      <Header />
      <Container className="mb-5 mt-5">
        <Row>
          {art ? (
            <>
              <Col md={6}>
                {art.photos && art.photos.length > 0 && (
                  <img
                    src={`http://localhost:80/${art.photos[0].replace(
                      "\\",
                      "/"
                    )}`}
                    alt={art.art_name}
                    width="100%"
                  />
                )}
              </Col>
              <Col md={6}>
                <Row className="mt-3">
                  <Col md={4}>
                    <h6>Art:</h6>
                  </Col>
                  <Col md={6}>
                    <h6>{art.art_name}</h6>
                  </Col>
                  <Col md={4}>
                    <h6>Artist:</h6>
                  </Col>
                  <Col md={6}>
                    <h6>{art.artist_name}</h6>
                  </Col>
                  <Col md={4}>
                    <h6>Price:</h6>
                  </Col>
                  <Col md={6}>
                    <h6>{art.price}</h6>
                  </Col>
                  <Col md={4}>
                    <h6>Price:</h6>
                  </Col>
                  <Col md={6}>
                    <h6>{art.price}</h6>
                  </Col>
                  <Col md={4}>
                    <h6>Category:</h6>
                  </Col>
                  <Col md={6}>
                    <h6>{art.category}</h6>
                  </Col>
                  <Col md={4}>
                    <h6>Description:</h6>
                  </Col>
                  <Col md={6}>
                    <h6>{art.description}</h6>
                  </Col>
                  <div>
                    <Link to={`/payment/${art._id}`}>
                      <Button
                        variant="outlined"
                        sx={{
                          border: "2px solid black",
                          color: "black",
                          marginTop: "20px",
                        }}
                      >
                        Buy Now
                      </Button>
                    </Link>
                  </div>
                </Row>
              </Col>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Row>
      </Container>
    </>
  );
}
