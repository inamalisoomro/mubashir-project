import { useEffect, useState } from "react";
import API_URL from "../config/api";

function FoodMenu() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getFoods();
  }, []);

  const getFoods = async () => {
    try {
      const response = await fetch(`${API_URL}/foods`);
      const data = await response.json();

      if (response.ok) {
        setFoods(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error loading foods");
    }
  };

  const addToCart = (food) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingFood = cart.find((item) => item._id === food._id);

    if (existingFood) {
      existingFood.quantity += 1;
    } else {
      cart.push({
        ...food,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added To Cart");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Food Menu</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {foods.map((food) => (
          <div
            key={food._id}
            style={{
              width: "250px",
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <img
              src={food.image}
              alt={food.name}
              width="100%"
              height="180"
              style={{ objectFit: "cover" }}
            />

            <h2>{food.name}</h2>

            <p>{food.description}</p>

            <h3>${food.price}</h3>

            <button onClick={() => addToCart(food)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodMenu;