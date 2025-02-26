import React from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import sliderimg1 from "../../Images/sliderimg1.jpg";
import sliderimg2 from "../../Images/sliderimg2.jpg";
import sliderimg3 from "../../Images/sliderimg3.jpg";
import "../../Css/home.css";
export default function Banner() {
  return (
    <div>
      <section className="digital_bg_img">
        <Container>
          <Row>
            <Col md={6}></Col>
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
      </section>
    </div>
  );
}
