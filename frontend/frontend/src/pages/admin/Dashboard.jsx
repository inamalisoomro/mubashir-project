import { useEffect, useState } from "react";
import API_URL from "../../config/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalCustomers: 0,
    totalFoods: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/dashboard`);

      const data = await response.json();

      if (response.ok) {
        setDashboard(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error loading dashboard");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            width: "220px",
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h2>Total Customers</h2>
          <h1>{dashboard.totalCustomers}</h1>
        </div>

        <div
          style={{
            width: "220px",
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h2>Total Foods</h2>
          <h1>{dashboard.totalFoods}</h1>
        </div>

        <div
          style={{
            width: "220px",
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h2>Total Orders</h2>
          <h1>{dashboard.totalOrders}</h1>
        </div>

        <div
          style={{
            width: "220px",
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h2>Total Revenue</h2>
          <h1>${dashboard.totalRevenue}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;