/** @format */

import React, { useState } from "react";

import { postApihandler } from "../../Apihandler";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Button } from "@mui/material";

export default function Login() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userLogin = async (e) => {
    e.preventDefault();
    const data = {
      user_Email: email,
      password: password,
    };
    console.log("login data is --->", data);
    const res = await postApihandler("/userLogin", data);

    if (res.status === 200) {
      localStorage.setItem("userData", JSON.stringify(res.data));
      localStorage.setItem("isArtistLoggedIn", false);
      localStorage.setItem("check", "user");
      swal(" Login Successfully");
      navigate("/homepage");
    } else {
      swal(
        "Error",
        res.error.response.data.message || "An unknown error occurred.",
        "error"
      );
    }
  };

  // ******** artist login ********
  const [artistemail, setArtistEmail] = useState("");
  const [artistpassword, setArtistPassword] = useState("");
  const artistLogin = async (e) => {
    e.preventDefault();
    const data = {
      user_Email: artistemail,
      password: artistpassword,
    };

    const res = await postApihandler("/artistLogin", data);

    if (res.status === 200) {
      localStorage.setItem("userData", JSON.stringify(res.data));
      localStorage.setItem("check", "artist");

      swal(" Login Successfully");
      localStorage.setItem("isArtistLoggedIn", true);
      navigate("/homepage");
    } else {
      swal(
        "Error",
        res.error.response.data.message || "An unknown error occurred.",
        "error"
      );
    }
  };
  return (
    <div>
      <section className="signup_banner">
        <div class="container d-flex justify-content-center">
          <div class="row">
            <Box sx={{ width: "100%", typography: "body1", marginTop: "30px" }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label="User"
                      value="1"
                      sx={{
                        backgroundColor: "#5a2d82 ",
                        color: "white",
                        borderRadius: "8px",
                        marginRight: "10px",
                      }}
                    />
                    <Tab
                      label="Artist"
                      value="2"
                      sx={{
                        backgroundColor: "#5a2d82 ",
                        color: "white",
                        borderRadius: "8px",
                        marginRight: "10px",
                      }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div class="signup-box">
                    <h4>User</h4>

                    <h5>Login Here to access your account</h5>

                    <form class="mt-5" onSubmit={userLogin}>
                      <div class="mb-4">
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Email Address"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div class="mb-4 position-relative">
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          placeholder="Password"
                          required
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <i
                          class="fa fa-eye password-toggle"
                          onclick="togglePassword('password')"
                        ></i>
                      </div>
                      <div class="form-check d-flex justify-content-between ">
                        <div>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckChecked"
                          >
                            Remember Me
                          </label>
                        </div>
                        <div>
                          <a href="/forgotpassword">
                            <p>Forgot Password</p>
                          </a>
                        </div>
                      </div>

                      <button type="submit" class="btn btn-custom w-100 mt-4">
                        PROCEED TO LOGIN
                      </button>

                      <p class="mt-5">
                        Don’t have an account ?
                        <a
                          href="/signup"
                          style={{ color: "#4c1f7a", fontWeight: "700" }}
                        >
                          Sign Up
                        </a>{" "}
                        Here...!!!
                      </p>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div class="signup-box">
                    <h4>Artist</h4>

                    <h5>Login Here to access your account</h5>

                    <form class="mt-5" onSubmit={artistLogin}>
                      <div class="mb-4">
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Email Address"
                          required
                          onChange={(e) => setArtistEmail(e.target.value)}
                        />
                      </div>

                      <div class="mb-4 position-relative">
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          placeholder="Password"
                          required
                          onChange={(e) => setArtistPassword(e.target.value)}
                        />
                        <i
                          class="fa fa-eye password-toggle"
                          onclick="togglePassword('password')"
                        ></i>
                      </div>
                      <div class="form-check d-flex justify-content-between ">
                        <div>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            checked
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckChecked"
                          >
                            Remember Me
                          </label>
                        </div>
                        <div>
                          <a href="/artistforgotpssword">
                            <p>Forgot Password</p>
                          </a>
                        </div>
                      </div>

                      <button type="submit" class="btn btn-custom w-100 mt-4">
                        PROCEED TO LOGIN
                      </button>
                      <p class="mt-5">
                        Don’t have an account ?
                        <a
                          href="/signup"
                          style={{ color: "#4c1f7a", fontWeight: "700" }}
                        >
                          Sign Up
                        </a>{" "}
                        Here...!!!
                      </p>
                    </form>
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </section>
    </div>
  );
}
