import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(items);

    // Pre-fill user info from localStorage if available
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, []);

  const totalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return parseFloat(total.toFixed(2));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!name || !phone || !address) {
      alert("Please fill in all delivery details");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
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
        const order = data.order;

        // Clear cart
        localStorage.removeItem("cart");

        // ── PayHere Sandbox Payment ─────────────────────────────────────
        // Store order ID so the success page can use it
        localStorage.setItem("lastOrderId", order._id);

        // Build PayHere payment form and submit
        initiatePayHere(order);
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // PayHere Sandbox integration
  const initiatePayHere = (order) => {
    // PayHere sandbox URL
    const payhereUrl = "https://sandbox.payhere.lk/pay/checkout";

    // Create a hidden form and submit to PayHere
    const form = document.createElement("form");
    form.method = "POST";
    form.action = payhereUrl;

    const fields = {
      merchant_id: "1211149",        // PayHere sandbox merchant ID
      return_url: `${window.location.origin}/ordersuccess`,
      cancel_url: `${window.location.origin}/cart`,
      notify_url: `${API_URL}/orders/payment/notify`,
      order_id: order._id,
      items: order.items.map((i) => i.name).join(", "),
      currency: "LKR",
      amount: order.total.toFixed(2),
      first_name: name.split(" ")[0],
      last_name: name.split(" ").slice(1).join(" ") || "N/A",
      email: JSON.parse(localStorage.getItem("user"))?.email || "guest@example.com",
      phone: phone,
      address: address,
      city: "Colombo",
      country: "Sri Lanka",
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
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
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <br />
        <br />

        <textarea
          placeholder="Enter Delivery Address"
          rows="4"
          cols="40"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
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
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}

        <h2>Total: ${totalPrice()}</h2>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Place Order & Pay with PayHere"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;