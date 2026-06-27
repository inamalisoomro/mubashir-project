import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
      }}
    >
      <h1 style={{ color: "green" }}>🎉 Order Placed Successfully!</h1>

      <br />

      <h2>Thank You For Your Order</h2>

      <p>
        Your order has been received successfully.
      </p>

      <p>
        Our team is preparing your food and it will be delivered as soon as possible.
      </p>

      <br />

      <h3>Payment Status</h3>

      <p style={{ color: "green", fontWeight: "bold" }}>
        ✔ Payment Successful
      </p>

      <br />

      <Link to="/foodmenu">
        <button
          style={{
            padding: "10px 20px",
            marginRight: "15px",
            cursor: "pointer",
          }}
        >
          Order More Food
        </button>
      </Link>

      <Link to="/">
        <button
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Back To Home
        </button>
      </Link>
    </div>
  );
}

export default OrderSuccess;