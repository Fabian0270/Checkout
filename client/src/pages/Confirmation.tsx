import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 


export const Confirmation = () => {
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { clearCart } = useCart(); 

  useEffect(() => {
    const verifySession = async () => {
      try {
        let sessionId;
        const dataFromLs = localStorage.getItem("sessionId");
        if (dataFromLs) {
          sessionId = JSON.parse(dataFromLs);
        }

        const response = await fetch(
          "http://localhost:3000/payments/verify-session",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          }
        );

        const data = await response.json();

        if (response.ok && data.verified) {
          setVerified(true);
          setIsLoading(false);
          clearCart();
          localStorage.removeItem("sessionId");
        } else {
          console.error("ERROR VERIFYING:", data);
        }
      } catch (error) {
        console.error("ERROR VERIFYING:", error);
      }
    };

    if (!verified) {
      verifySession();
    }
  }, [verified, clearCart]);

  const goBackToShop = () => {
    navigate("/store");
  };

  setTimeout(function(){ window.location.href = "/store"; }, 10000);


return (
  <div>
    <button onClick={goBackToShop}>
      To Store
    </button>
    {verified && !isLoading ? (
      <div className=" h-screen">
        <h3>This page will self-redirect back to store in 10 seconds..........</h3>
      </div>
    ) : (
      <h3>LOADING...</h3>
    )}
  </div>
);

}