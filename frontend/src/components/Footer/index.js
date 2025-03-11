import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export default function Footer() {
  return (
    <>
      <footer
        className=""
        style={{ backgroundColor: "#c93737", padding: "30px" , marginTop:"30px"}}
      >
        <Container>
          <Row>
            <Col md={3}>
              <h4 style={{ color: "#fff", fontWeight: "300" }}>
                Sign up to receive awesome content
              </h4>
              <input
                placeholder="Your email address"
                style={{ padding: "5px 20px" }}
              />
              <input
                placeholder="Let’s keep in touch"
                style={{
                  padding: "15px 10px",
                  backgroundColor: "transparent",
                  color: "white",
                  marginTop: "20px",
                  border: "2px solid white",
                }}
              />
            </Col>
            <Col md={3}>
              <div>
                <h5
                  style={{
                    color: "white",
                    fontWeight: "400",
                    textAlign: "left",
                  }}
                >
                  Categories
                </h5>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    Artists
                  </li>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    Paintings
                  </li>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    Sculpture
                  </li>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    Print
                  </li>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    Traditional Arts
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={3}>
              <div>
                <h5
                  style={{
                    color: "white",
                    fontWeight: "400",
                    textAlign: "left",
                  }}
                >
                  Useful Links
                </h5>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    Contact Us
                  </li>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    Privacy Policy
                  </li>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    Shipping Policy
                  </li>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    Return Policy
                  </li>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "5px 0",
                    }}
                  >
                    Term and Condition
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={3}>
              <div>
                <h5
                  style={{
                    color: "white",
                    fontWeight: "400",
                    textAlign: "left",
                  }}
                >
                  Contact Info
                </h5>
                <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "10px 0",
                    }}
                  >
                    <LocalPhoneIcon /> 70218 31385
                  </li>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "10px 0",
                    }}
                  >
                    <EmailIcon /> info@tulikaartsgallery.com
                  </li>
                  <li
                    style={{
                      color: "white",
                      textAlign: "left",
                      padding: "10px 0",
                    }}
                  >
                    <LocationOnIcon /> Tulika Arts Gallery, 12, Raghuvanshi
                    Mills, Senapati Bapat Marg, Lower Parel, Mumbai - 400 013,
                    India. Gayatri Impex Private Limited
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
          <hr style={{ color: "white" }} />
        </Container>
        <p style={{ color: "white" , marginTop:"20px"}}>
          Copyright 2023 Digital Art Gallery . All right reserved
        </p>
      </footer>
    </>
  );
}
