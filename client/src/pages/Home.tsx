import { useState, useEffect } from "react";
import { Registration } from "../components/Registration";
import { Login } from "../components/Login";
import { useNavigate } from "react-router-dom";



export const Home = () => {
  const [user, setUser] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const goToShopping = () => {
    navigate("/store");
  };

  useEffect(() => {
    const authorize = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/authorize", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Server response: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (error: any) {
        console.error("Authorization-error:", error.message);
        setUser("");
      }
    };
    authorize();
  }, []);


return (
  <div>
    <h1>
      {user ? (
        `INLOGGAD ${user}` 
      ) : (
        <img alt="Logo"  /> 
      )}
    </h1>
    {!user && (
      <>
        {isRegistering ? (
          <>
            <Registration />
            <span 
              onClick={() => setIsRegistering(false)}>
              Back to Login
            </span>
          </>
        ) : (
          <div>
            <Login />
            <p>
              New User? Proceeed to registration{" "}
              <span
                onClick={() => setIsRegistering(true)}>
                here
              </span>
              !
            </p>
            </div>
        )}
      </>
    )}
    {user && (
      <button
        onClick={goToShopping}> 
        Go to Products
      </button>
    )}
  </div>
);
}