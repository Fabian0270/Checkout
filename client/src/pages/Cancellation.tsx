import { useNavigate } from "react-router-dom";

export const Cancellation = () => {
  const navigate = useNavigate();

  setTimeout(function(){ window.location.href = "/store"; }, 5000);

  return (
    <div>
      <button
        onClick={() => navigate("/store")}
      >
        Back to store
      </button>
      <h3>This page will selfredirect in 5 seconds.....</h3>
    </div>
  );
};