import { Route, Routes } from "react-router-dom"
import Payment from "./Payment"
import Confirmation from "./Confirmation"

import { useCart } from "../context/CartContext";
import "./Header.css"
import { BsCart2 } from "react-icons/bs";

const Header = () => {
    const { cart } = useCart()

    return (
        <div className="header">
            <h1>The Dog Park</h1>
            <h2>Bästa Gymmet I Skåne</h2>
            <div className="cart">
                <BsCart2 />
                <p>{cart.length}</p>
                <Routes>
                    <Route path="/" element={<Payment />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                </Routes>
            </div>
        </div>
    )
}

export default Header