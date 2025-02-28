import React, { useState } from "react";
import signupimg from "../../Images/pexels-photo-4238493.jpeg";
import { postApihandler } from "../../Apihandler";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function Login() {
  const [value, setValue] = React.useState("1");

  const handleChange = ( newValue ) => {
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
    // console.log("login api response is ---->", res);
    if (res.status === 200) {
      swal(" Login Successfully");
      navigate("/homepage");
    } else {
      swal("Error", res.message || "An unknown error occurred.", "error");
    }
    // console.log("login api response is ------->", res);
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
    //console.log("artist login api response is ---->", data);
    const res = await postApihandler("/artistLogin", data);
    console.log("login api response is ---->", res);
    if (res.status === 200) {
      swal(" Login Successfully");
      // navigate("/");
    } else {
      swal("Error", res.message || "An unknown error occurred.", "error");
    }
  };
  return (
    <div>
      <section>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="signup_img">
                <img src={signupimg} alt="" width="100%" />
              </div>
            </div>
            <div class="col-md-6">
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab label="User" value="1" />
                      <Tab label="Artist" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div class="signup-box">
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
                            <p>Forgot Password</p>
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
                  <div class="mb-4">
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Age"
                            required
                            onChange={(e) => setArtistAge(e.target.value)}
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
                            <p>Forgot Password</p>
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
        </div>
      </section>
    </div>
  );
}
