import React from "react";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "80px 20px",
          background: "#ff5722",
          color: "#fff",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>🍔 Welcome to Foodie Express</h1>
        <p style={{ fontSize: "1.2rem", marginTop: "15px" }}>
          Delicious food delivered fresh to your doorstep.
        </p>

        <button
          style={{
            marginTop: "30px",
            padding: "12px 30px",
            fontSize: "18px",
            border: "none",
            borderRadius: "8px",
            background: "#fff",
            color: "#ff5722",
            cursor: "pointer",
          }}
        >
          Order Now
        </button>
      </section>

      {/* Featured Foods */}
      <section style={{ padding: "50px" }}>
        <h2 style={{ textAlign: "center" }}>🍕 Featured Foods</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "40px",
          }}
        >
          {[
            {
              name: "Cheese Pizza",
              price: "$12",
              img: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
            },
            {
              name: "Chicken Burger",
              price: "$9",
              img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            },
            {
              name: "Chocolate Cake",
              price: "$8",
              img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
            },
          ].map((food, index) => (
            <div
              key={index}
              style={{
                width: "280px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 5px 10px rgba(0,0,0,.1)",
              }}
            >
              <img
                src={food.img}
                alt={food.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "20px" }}>
                <h3>{food.name}</h3>
                <p>{food.price}</p>

                <button
                  style={{
                    width: "100%",
                    padding: "10px",
                    background: "#ff5722",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        style={{
          background: "#f8f8f8",
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2>Why Choose Foodie Express?</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "50px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3>🚀 Fast Delivery</h3>
            <p>Get your food delivered within 30 minutes.</p>
          </div>

          <div>
            <h3>🥗 Fresh Ingredients</h3>
            <p>Prepared using fresh and high-quality ingredients.</p>
          </div>

          <div>
            <h3>💳 Secure Payment</h3>
            <p>Safe online payments using PayHere Sandbox.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#222",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <p>© 2026 Foodie Express. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Home;