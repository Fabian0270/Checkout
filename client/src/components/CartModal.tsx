import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";


const CartModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { cart, removeFromCart } = useCart();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const totalCost = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    const newTotalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setTotalQuantity(newTotalQuantity);
  }, [cart]);

  const handlePayment = async () => {
    const cartForStripe = cart.map((item) => ({
      image: item.product.images[0],
      name: item.product.name,
      product: item.product.id,
      quantity: item.quantity,
    }));

    const response = await fetch(
      "http://localhost:3000/payments/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(cartForStripe),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      localStorage.setItem("sessionId", JSON.stringify(data.sessionId));
      window.location.href = data.url;
      
    } else {
      console.error("Failed to create checkout session", data);
    }

  };



return (
  <div className={isOpen ? "fixed top-0 right-0  w-96 h-screen bg-emerald-100  p-5 shadow-lg overflow-y-auto z-50" : "hidden"}>
    <div>
    <ul>
      {cart.map((item) => (
        <li key={item.product.id}>
          <img
            src={item.product.images[0]}
            alt={item.product.name}
          />
          <span>{item.product.name} - Amount: {item.quantity}</span>
          <button
            onClick={() => removeFromCart(item.product.id)}>
          </button>
        </li>
      ))}
    </ul>
    <div>Total Items: {totalQuantity}</div>
    <div>Total Cost: {totalCost} SEK</div>
    <div>
      <button onClick={handlePayment}>
        Checkout
      </button>
    </div>
    <button onClick={onClose}>
      Close
    </button>
    </div>
  </div>
);
};

export default CartModal;