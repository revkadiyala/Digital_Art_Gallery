import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import digitallogo from "../../Images/digitalartlogo.avif";
import SearchIcon from "@mui/icons-material/Search";
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
                href="/community"
                style={{
                  color: "#282828",
                  fontWeight: "600",
                  padding: "5px 20px",
                }}
              >
                Community
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
          <div style={{ position: "relative", display: "inline-block" }}>
            <input
              placeholder="Search By Artist, Ref No. Title,..."
              style={{
                padding: "10px 40px 10px 20px", // Extra right padding for the icon
                width: "250px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
            <SearchIcon
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#888",
                cursor: "pointer",
              }}
            />
          </div>
          <Nav.Link href="/profile">
            <AccountCircleIcon sx={{ marginLeft: "20px", fontSize: "30px" }} />
          </Nav.Link>
        </Container>
      </Navbar>
    </div>
  );
}
