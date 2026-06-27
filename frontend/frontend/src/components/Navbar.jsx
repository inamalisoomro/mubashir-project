import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successfully");

    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        background: "#333",
        color: "white",
      }}
    >
      <h2>🍔 Food Ordering</h2>

      <div>
        <Link
          to="/"
          style={{
            color: "white",
            marginRight: "15px",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        <Link
          to="/foodmenu"
          style={{
            color: "white",
            marginRight: "15px",
            textDecoration: "none",
          }}
        >
          Menu
        </Link>

        <Link
          to="/cart"
          style={{
            color: "white",
            marginRight: "15px",
            textDecoration: "none",
          }}
        >
          Cart
        </Link>

        {user ? (
          <>
            <span style={{ marginRight: "15px" }}>
              Hello {user.name}
            </span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "white",
                marginRight: "15px",
                textDecoration: "none",
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;