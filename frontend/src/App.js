import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import HomePage from "./pages/HomePage";
import Artist from "./pages/Artist";
import Community from "./pages/Community";
import CollectionGallery from "./pages/CollectionGallery";
import Profile from "./pages/Profile";
import ArtDetail from "./pages/ArtDetail";
import AllArt from "./pages/AllArt";
// import Art from "../../digitalartgalleryadmin/src/Pages/Art";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/community" element={<Community />} />
          <Route path="/collectiongallery" element={<CollectionGallery />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artdetail/:id" element={<ArtDetail />} />
          <Route path="/all-arts" element={<AllArt />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
