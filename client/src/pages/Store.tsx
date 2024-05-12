import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import CartModal from "../components/CartModal";

export const Store = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
          console.error("Server response ", response.status);
          throw new Error("ERROR: Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products.length) {
    return (
    <div className="flex mt-96 justify-center">
    </div>
  )}


return (
  <>
    <Header setIsModalOpen={setIsModalOpen} />
    <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    <div>
      <div className="products-container" >
        {products.map((product: { id: string; images: string[]; name: string; price: number }) => (
          <div className="product" key={product.id}>
            {product.images && (
              <img
                src={product.images[0]}
                alt={product.name}
                width={200}
                height={200}
              />
            )}
            <h2>{product.name}</h2>
            <h3>{product.price}:-</h3>
            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  </>
);
}