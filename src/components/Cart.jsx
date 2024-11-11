import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContex";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { items, addItem, removeItem } = useContext(CartContext);
  const { progress, hideCart } = useContext(UserProgressContext);
  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  //close modal
  function handleCloseCart() {
    hideCart();
  }
  return (
    <Modal className="cart" open={progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => addItem(item)}
            onDecrease={() => removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly={true} onClick={handleCloseCart}>
          Close
        </Button>
        <Button className="">Checkout</Button>
      </p>
    </Modal>
  );
}
