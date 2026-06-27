import { useEffect, useState } from "react";
import API_URL from "../../config/api";

function FoodManagement() {
  const [foods, setFoods] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

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
    }
  };

  const addFood = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/foods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
          image,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Food Added Successfully");

        setName("");
        setDescription("");
        setPrice("");
        setImage("");

        getFoods();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFood = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/foods/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert("Food Deleted Successfully");
        getFoods();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Food Management</h1>

      <form onSubmit={addFood}>
        <input
          type="text"
          placeholder="Food Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Add Food</button>
      </form>

      <hr />

      <h2>All Foods</h2>

      {foods.map((food) => (
        <div
          key={food._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <img
            src={food.image}
            alt={food.name}
            width="150"
            height="100"
            style={{ objectFit: "cover" }}
          />

          <h3>{food.name}</h3>

          <p>{food.description}</p>

          <h4>${food.price}</h4>

          <button
            onClick={() => deleteFood(food._id)}
            style={{
              background: "red",
              color: "white",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default FoodManagement;