import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import scndimg1 from "../../Images/curatorsimg1.jpg";
import scndimg2 from "../../Images/curatorsimg2.jpg";
import scndimg3 from "../../Images/curatorsimg3.jpeg";
import scndimg4 from "../../Images/curatorsimg4.jpg";
import { getApihandler } from "../../Apihandler";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Scnd() {
  const [arts, setArts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    getArts();
  }, []);
  const getArts = async () => {
    const res = await getApihandler("/getArt");
    console.log("get art api response is ------>", res);
    if (res.message === "Arts retrieved successfully") {
      setArts(res.arts);
    }
  };
  return (
    <>
      <Container className="mt-5">
        <Row>
          {arts.slice(0, 4).map((art, index) => (
            <Col md={3} key={index}>
              <Link
                to={`/artdetail/${art._id}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                <div>
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
                  <h5 style={{ fontWeight: "400" }}>{art.artist_name}</h5>
                  <p style={{ color: "gray" }}>{art.description}</p>
                  <p style={{ fontWeight: "700" }}>{art.price}</p>
                </div>
              </Link>
            </Col>
          ))}
        </Row>

        {/* View All Button */}
        <div className="text-center mt-4">
          <Button
            onClick={() => navigate("/all-arts")}
            style={{
              backgroundColor: "rgb(201, 55, 55)",
              border: "none",
              padding: "7px 20px",
              color: "white",
            }}
          >
            View All
          </Button>
        </div>

        <hr />
      </Container>
    </>
  );
}
