import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApihandler } from "../../Apihandler";
import AdminLayout from "../../Layout/AdminLayout";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function ArtDetail() {
  const { id } = useParams(); // Extract the art ID from the URL
  const [data, setData] = useState(null);
  useEffect(() => {
    getArtDetails();
  }, []);

  const getArtDetails = async () => {
    const res = await getApihandler(`/getArt/${id}`); // Make an API call to get art details
    if (res.message === "Success") {
      setData(res.data);
    }
  };

  return (
    <AdminLayout>
      <Container>
        <Row>
          {data ? (
            <>
              <Col md={6}>
                {data.photos && data.photos.length > 0 && (
                  <img
                    src={`http://localhost:80/${data.photos[0].replace(
                      "\\",
                      "/"
                    )}`}
                    alt={data.art_name}
                    width="100%"
                  />
                )}
              </Col>
              <Col md={6}>
                <h2>{data.art_name}</h2>
                <p>
                  <strong>Artist:</strong> {data.artist_name}
                </p>
                <p>
                  <strong>Price:</strong> {data.price}
                </p>
                <p>
                  <strong>Description:</strong> {data.description}
                </p>
              </Col>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Row>
      </Container>
    </AdminLayout>
  );
}
