import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Art from "./Pages/Art";
import ArtDetail from "./Pages/Art/artdetail";
import Category from "./Pages/Category";
import Artist from "./Pages/Artist";
import BookedArts from "./Pages/Art/bookedarts";
import Reviews from "./Pages/Reviews";
import ArtCommission from "./Pages/Art/artcommission";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/arts" element={<Art />} />
          <Route path="/artdetail/:id" element={<ArtDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/bookedarts" element={<BookedArts />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/commission" element={<ArtCommission />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
