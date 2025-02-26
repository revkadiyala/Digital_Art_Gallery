import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import scndimg1 from "../../Images/curatorsimg1.jpg";
import scndimg2 from "../../Images/curatorsimg2.jpg";
import scndimg3 from "../../Images/curatorsimg3.jpeg";
import scndimg4 from "../../Images/curatorsimg4.jpg";
export default function Scnd() {
  return (
    <>
      <Container className="mt-5" style={{marginTop:"70px"}}>
        <Row>
          <Col md={3}>
            <div>
              <img src={scndimg1} width="100%" />
              <p>Shilpa Patole</p>
              <p style={{ fontWeight: "700" }}>116,000.00</p>
            </div>
          </Col>
          <Col md={3}>
            <div>
              <img src={scndimg2} width="100%" />
              <p>Rahul Dangat</p>
              <p style={{ fontWeight: "700" }}>108,000.00</p>
            </div>
          </Col>
          <Col md={3}>
            <div>
              <img src={scndimg3} width="100%" />
              <p>Pravin Utge</p>
              <p style={{ fontWeight: "700" }}>80,000.00</p>
            </div>
          </Col>
          <Col md={3}>
            <div>
              <img src={scndimg4} width="100%" />
              <p>Pravin Utge</p>
              <p style={{ fontWeight: "700" }}>80,000.00</p>
            </div>
          </Col>
        </Row>
        <hr />
      </Container>
    </>
  );
}
