function FoodCard({ food, addToCart }) {
  return (
    <div
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
        style={{
          objectFit: "cover",
        }}
      />

      <h2>{food.name}</h2>

      <p>{food.description}</p>

      <h3>${food.price}</h3>

      <button onClick={() => addToCart(food)}>
        Add To Cart
      </button>
    </div>
  );
}

export default FoodCard;