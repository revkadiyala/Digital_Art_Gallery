import React from "react";
import "../../Css/home.css";
import { Col, Container, Row } from "react-bootstrap";

export default function Testimonial() {
  const [value, setValue] = React.useState(2);
  return (
    <>
      <section className="testimonial_bg" style={{ marginTop: "70px" }}>
        <Container>
          <h3 style={{ color: "white", padding: "30px", fontWeight: "400" }}>
            WHAT CLIENTS SAY ?
          </h3>
          <Row className="mt-5">
            <Col md={6}>
              <div className="testimonial_box" style={{ padding: "30px" }}>
                <p style={{ fontSize: "20px" }}>
                  "I purchased a beautiful painting from Digital Arts.Once
                  purchased, the painting arrived quickly and safely. The Indian
                  art market is incredible - and online art Gallery such as
                  Tulika Arts make it so much easier to access it now.{" "}
                </p>
                <p>
                  <span style={{ fontWeight: "700" }}>Sharmila - </span>Happy
                  Client
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="testimonial_box" style={{ padding: "30px" }}>
                <p style={{ fontSize: "20px" }}>
                  "I purchased a beautiful painting from Digital Arts.Once
                  purchased, the painting arrived quickly and safely. The Indian
                  art market is incredible - and online art Gallery such as
                  Tulika Arts make it so much easier to access it now.{" "}
                </p>
                <p>
                  <span style={{ fontWeight: "700" }}>Manisha- </span>Happy
                  Client
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
