    import { useEffect, useState } from "react";
import API_URL from "../../config/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/customers`);

      const data = await response.json();

      if (response.ok) {
        setCustomers(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customers</h1>

      {customers.map((customer) => (
        <div
          key={customer._id}
          style={{
            border: "1px solid gray",
            borderRadius: "10px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3>{customer.name}</h3>

          <p>Email: {customer.email}</p>

          <p>Phone: {customer.phone}</p>

          <p>Role: {customer.role}</p>
        </div>
      ))}
    </div>
  );
}

export default Customers;