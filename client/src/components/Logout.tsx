import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useCart();

  const handleLogout = async () => {
    const confirmLogout = confirm("LOGGING OUT?");
    if (!confirmLogout) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.status === 200) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        setUser({ email: "" });

        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Log out
    </button>
  );
};

export default Logout;