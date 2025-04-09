import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getApihandler, getApihandlerByParams } from "../../Apihandler";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";

export default function SearchArt() {
  const [searchParams] = useSearchParams(); // Get query params from URL
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      const categoryName = searchParams.get("category") || "";
      const price = searchParams.get("price") || "";

      try {
        const response = await getApihandler(
          `/searchArt?categoryName=${categoryName}&price=${price}`
        );

        if (response?.data) {
          setArts(response.data);
        } else {
          setArts([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setArts([]);
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [searchParams]);
  return (
    <>
      <Header />
      <div className="container">
        <h4 className="mt-4">Search Results</h4>
        {loading ? (
          <p>Loading...</p>
        ) : arts.length > 0 ? (
          <div className="row">
            {arts.map((art) => (
              <div key={art._id} className="col-md-4">
                <div
                  style={{
                    background: "rgb(201, 55, 55)",
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    color: "white",
                  }}
                >
                  <img
                    src={`http://localhost:80/${art.photos[0]}`} // Ensure correct path
                    alt={art.art_name}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <h5 className="mt-2">{art.art_name}</h5>
                  <p>Artist: {art.artist_name}</p>
                  <p>Category: {art.category}</p>
                  <p>Price: {art.price}</p>

                  <Link to={`/payment/${art._id}`}>
                    <Button
                      variant="outlined"
                      sx={{ border: "2px solid white", color: "white" }}
                    >
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
}
