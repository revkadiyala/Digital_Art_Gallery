import React, { useEffect, useState } from "react";
import { Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import digitallogo from "../../Images/digitalartlogo.avif";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const [role, setRole] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const check = localStorage.getItem("check");
    const userData = localStorage.getItem("userData");

    if (check) {
      setRole(check);
    }
    setIsLoggedIn(!!userData);
  }, []);
  // ****** logout ******
  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("check");
    setIsLoggedIn(false);
    setRole(null);
    navigate("/"); // Redirect to login page after logout
  };
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
              {role === "user" && (
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
              )}

              {role === "artist" && (
                <Nav.Link
                  href="/myarts"
                  style={{
                    color: "#282828",
                    fontWeight: "600",
                    padding: "5px 20px",
                  }}
                >
                  My Arts
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>

          <NavDropdown
            title={<AccountCircleIcon sx={{ fontSize: "30px" }} />}
            align="end"
          >
            {isLoggedIn ? (
              <>
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item href="/myfollowers">
                  My Followers
                </NavDropdown.Item>

                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </>
            ) : (
              <>
                <NavDropdown.Item href="/">Login</NavDropdown.Item>
                <NavDropdown.Item href="/signup">Signup</NavDropdown.Item>
              </>
            )}
          </NavDropdown>
        </Container>
      </Navbar>
    </div>
  );
}
