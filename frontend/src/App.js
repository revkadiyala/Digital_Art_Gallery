import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import HomePage from "./pages/HomePage";
import Artist from "./pages/Artist";
import Profile from "./pages/Profile";
import ArtDetail from "./pages/ArtDetail";
import AllArt from "./pages/AllArt";
import MyArts from "./pages/AllArt/myarts";
import SearchArt from "./pages/SearchArt";
import MyFollowers from "./pages/Artist/myfollowers";
import Payment from "./pages/Payment";
import BuyArts from "./pages/AllArt/buyarts";
import Reviews from "./pages/Reviews";
import SellArts from "./pages/AllArt/sellarts";
import ForgotPassword from "./pages/Forgot password/forgotpassword";
import ResetPassword from "./pages/Forgot password/resetpassword";
import ArtistForgotPassword from "./pages/Forgot password/artistforgotpassword";
import ArtistResetPassword from "./pages/Forgot password/artistresetpassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artdetail/:id" element={<ArtDetail />} />
          <Route path="/all-arts" element={<AllArt />} />
          <Route path="/myarts" element={<MyArts />} />
          <Route path="/searcharts" element={<SearchArt />} />
          <Route path="/myfollowers" element={<MyFollowers />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/buyarts" element={<BuyArts />} />
          <Route path="/sellarts" element={<SellArts />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/reset-passwrod" element={<ResetPassword />} />
          <Route
            path="/artistforgotpssword"
            element={<ArtistForgotPassword />}
          />
          <Route
            path="/artist-reset-password"
            element={<ArtistResetPassword />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
