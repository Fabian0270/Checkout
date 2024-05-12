import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import Logout from "./Logout";

const Header = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const { cart, setUser } = useCart();
  const quantityProducts = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setUser({ email: userEmail });
    }
  }, [setUser]);

  return (
    <div className="header" >
      <Logout />


<div>
      <p className="cart" > Cart - {quantityProducts}
      </p>
      </div>

    </div>
  );
};

export default Header;