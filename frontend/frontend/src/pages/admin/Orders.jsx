import { useEffect, useState } from "react";
import API_URL from "../../config/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/orders`);
      const data = await response.json();

      if (response.ok) {
        setOrders(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order Updated");
        getOrders();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Customer: {order.name}</h3>

          <p>Phone: {order.phone}</p>

          <p>Address: {order.address}</p>

          <p>Total: ${order.total}</p>

          <p>Payment: {order.paymentStatus}</p>

          <p>Status: {order.status}</p>

          <h4>Ordered Items</h4>

          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>

          <br />

          <button
            onClick={() => updateStatus(order._id, "Preparing")}
          >
            Preparing
          </button>

          <button
            onClick={() => updateStatus(order._id, "Out for Delivery")}
            style={{ marginLeft: "10px" }}
          >
            Out for Delivery
          </button>

          <button
            onClick={() => updateStatus(order._id, "Delivered")}
            style={{ marginLeft: "10px" }}
          >
            Delivered
          </button>
        </div>
      ))}
    </div>
  );
}

export default Orders;