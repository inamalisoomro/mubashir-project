import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

function Checkout() {
  const [cart, setCart] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(items);
  }, []);

  const totalPrice = () => {
    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.quantity;
    });

    return total;
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          items: cart,
          total: totalPrice(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order Placed Successfully");

        localStorage.removeItem("cart");

        navigate("/ordersuccess");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>

      <h2>Customer Information</h2>

      <form onSubmit={placeOrder}>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Enter Delivery Address"
          rows="4"
          cols="40"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <br />
        <br />

        <h2>Order Summary</h2>

        {cart.map((item) => (
          <div
            key={item._id}
            style={{
              borderBottom: "1px solid gray",
              marginBottom: "10px",
            }}
          >
            <h3>{item.name}</h3>

            <p>Price: ${item.price}</p>

            <p>Quantity: {item.quantity}</p>

            <p>Subtotal: ${item.price * item.quantity}</p>
          </div>
        ))}

        <h2>Total: ${totalPrice()}</h2>

        <button type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;