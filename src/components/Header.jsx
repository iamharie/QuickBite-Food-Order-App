import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContex";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);
  const totalCartItems = items.reduce(
    (totalNumberOfItems, items) => items.quantity + totalNumberOfItems,
    0
  );

  function handleShowCart() {
    showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="QuickBite Logo" />
        <h1>Quick Bite</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={handleShowCart}>
          CART ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
