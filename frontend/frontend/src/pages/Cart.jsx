import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(items);
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = () => {
    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.quantity;
    });

    return total;
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <h3>Your cart is empty.</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid gray",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "10px",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                width="150"
                height="100"
                style={{ objectFit: "cover" }}
              />

              <h2>{item.name}</h2>

              <p>{item.description}</p>

              <h3>Price: ${item.price}</h3>

              <h3>Quantity: {item.quantity}</h3>

              <button onClick={() => decreaseQuantity(item._id)}>
                -
              </button>

              <button
                onClick={() => increaseQuantity(item._id)}
                style={{ marginLeft: "10px" }}
              >
                +
              </button>

              <button
                onClick={() => removeItem(item._id)}
                style={{
                  marginLeft: "20px",
                  background: "red",
                  color: "white",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <hr />

          <h2>Total Price: ${totalPrice()}</h2>

          <button onClick={checkout}>
            Proceed To Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;