import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import digitallogo from "../../Images/digitalartlogo.avif";
export default function Header() {
  return (
    <div>
      <Navbar
        expand="lg"
        className=""
        style={{ position: "static", backgroundColor: "white" }}
      >
        <Container>
          <Navbar.Brand href="#home">
            <img src={digitallogo} height="70px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center">
              <Nav.Link
                href="#home"
                style={{
                  color: "#282828",
                  fontWeight: "600",
                  padding: "5px 20px",
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#link"
                style={{
                  color: "#282828",
                  fontWeight: "600",
                  padding: "5px 20px",
                }}
              >
                Artist
              </Nav.Link>
              <Nav.Link
                href="#link"
                style={{
                  color: "#282828",
                  fontWeight: "600",
                  padding: "5px 20px",
                }}
              >
                Paintings
              </Nav.Link>
              <Nav.Link
                href="#link"
                style={{
                  color: "#282828",
                  fontWeight: "600",
                  padding: "5px 20px",
                }}
              >
                Sclupture
              </Nav.Link>
              <Nav.Link
                href="#link"
                style={{
                  color: "#282828",
                  fontWeight: "600",
                  padding: "5px 20px",
                }}
              >
                Print
              </Nav.Link>
              <Nav.Link
                href="#link"
                style={{
                  color: "#282828",
                  fontWeight: "600",
                  padding: "5px 20px",
                }}
              >
                Traditional Arts
              </Nav.Link>
              <Nav.Link
                href="#link"
                style={{
                  color: "#282828",
                  fontWeight: "600",
                  padding: "5px 20px",
                }}
              >
                Exhibitions
              </Nav.Link>
              <Nav.Link
                href="#link"
                style={{
                  color: "#282828",
                  fontWeight: "600",
                  padding: "5px 20px",
                }}
              >
                Offers
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
