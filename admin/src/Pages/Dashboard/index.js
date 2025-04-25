import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { getApihandler } from "../../Apihandler";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

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
      console.log(" count api response", response);
      if (response.success === true) {
        setCounts(response.data);
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const chartLabels = ["Users", "Arts", "Artists", "Categories"];
  const chartData = [
    counts.users,
    counts.arts,
    counts.artists,
    counts.categories,
  ];

  const barData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Total Count",
        data: chartData,
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#81c784"],
        borderRadius: 5,
      },
    ],
  };

  const pieData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Distribution",
        data: chartData,
        backgroundColor: ["#f06292", "#4fc3f7", "#ba68c8", "#ffd54f"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <AdminLayout>
      <h1 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "30px" }}>
        Admin Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {chartLabels.map((label, index) => (
          <div
            key={label}
            style={{
              backgroundColor: "#fff",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: "28px", margin: "0", color: "#333" }}>
              {chartData[index]}
            </h2>
            <p style={{ marginTop: "8px", color: "#777", fontWeight: 500 }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
            Bar Chart Overview
          </h3>
          <Bar data={barData} />
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "20px", textAlign: "center" }}>
            Pie Chart Overview
          </h3>
          <Pie data={pieData} />
        </div>
      </div>
    </AdminLayout>
  );
}
