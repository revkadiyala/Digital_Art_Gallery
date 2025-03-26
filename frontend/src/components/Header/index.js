import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import digitallogo from "../../Images/digitalartlogo.avif";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function Header() {
  return (
    <div>
      <Navbar
        expand="lg"
        className=""
        style={{ position: "static", backgroundColor: "white" }}
      >
        <Container>
          <Navbar.Brand href="/homepage">
            <img src={digitallogo} height="70px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center">
              <Nav.Link
                href="/homepage"
                style={{
                  color: "#282828",
                  fontWeight: "600",
                  padding: "5px 20px",
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="/artist"
                style={{
                  color: "#282828",
                  fontWeight: "600",
                  padding: "5px 20px",
                }}
              >
                Artist
              </Nav.Link>
             

              <Nav.Link
                href="/collectiongallery"
                style={{
                  color: "#282828",
                  fontWeight: "600",
                  padding: "5px 20px",
                }}
              >
                Collection Gallery
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

             
            </Nav>
          </Navbar.Collapse>
          <div style={{ position: "relative", display: "inline-block" }}>
           
           
          </div>
          <Nav.Link href="/profile">
            <AccountCircleIcon sx={{ marginLeft: "20px", fontSize: "30px" }} />
          </Nav.Link>
        </Container>
      </Navbar>
    </div>
  );
}
