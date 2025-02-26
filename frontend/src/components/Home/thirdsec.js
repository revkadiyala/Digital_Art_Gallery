import React from "react";

import { Col, Container, Row } from "react-bootstrap";
import worldimg from "../../Images/world-map.png";
import trusticon from "../../Images/trust-icon.png";
import supporticon from "../../Images/support.png"
import security from "../../Images/secure.png"
export default function Thirdsec() {
  return (
    <div>
      <Container style={{marginTop:"70px"}}>
        <Row>
          <Col md={3}>
            <div>
              <img src={worldimg} height="50px" width="50px"/>
            </div>
            <h6 style={{ color: "#282828", fontWeight: "600" }}>WORLDWIDE</h6>
            <p>Shipping</p>
          </Col>
          <Col md={3}>
            <div>
              <img src={trusticon} height="50px" width="50px" />
            </div>
            <h6 style={{ color: "#282828", fontWeight: "600" }}>TRUSTED</h6>
            <p>Since 2007</p>
          </Col>
          <Col md={3}>
            <div>
              <img src={supporticon} height="50px" width="50px" />
            </div>
            <h6 style={{ color: "#282828", fontWeight: "600" }}>SUPPORT 24/7</h6>
            <p>Dedicated support</p>
          </Col>
          <Col md={3}>
            <div>
              <img src={security} height="50px" width="50px" />
            </div>
            <h6 style={{ color: "#282828", fontWeight: "600" }}>100% SECURE CHECKOUT</h6>
            <p>Buyer Protection & Security</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
