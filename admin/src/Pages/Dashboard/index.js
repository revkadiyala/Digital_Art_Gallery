import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { getApihandler } from "../../Apihandler";
import { Link } from "react-router-dom";


export default function Dashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    arts: 0,
    artists: 0,
    categories: 0,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await getApihandler("/getAllCount");
      console.log("response",response);
      
      if (response.success === true) {
        setCounts(response.data)
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  return (
    <AdminLayout>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
  <Link
    to="http://localhost:3001/users"
    style={{ textDecoration: "none" }}
  >
    <div
      style={{
        background: "#f8d7da",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        width: "200px",
        cursor: "pointer", // Makes it look clickable
      }}
    >
      <h3>{counts.users}</h3>
      <p>Users</p>
    </div>
        </Link>
       
  <Link
    to="http://localhost:3001/arts"
    style={{ textDecoration: "none" }}
  >
        <div
          style={{
            background: "#d4edda",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            width: "200px",
          }}
        >
          <h3>{counts.arts}</h3>
          <p>Arts</p>
            </div>
        </Link>
       
        <div
          style={{
            background: "#cce5ff",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            width: "200px",
          }}
        >
          <h3>{counts.artists}</h3>
          <p>Artists</p>
          </div>
          <Link
    to="http://localhost:3001/category"
    style={{ textDecoration: "none" }}
  >
        <div
          style={{
            background: "#fff3cd",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            width: "200px",
          }}
        >
          <h3>{counts.categories}</h3>
          <p>Categories</p>
          </div>
           </Link>
      </div>
     
    </AdminLayout>
  );
}
