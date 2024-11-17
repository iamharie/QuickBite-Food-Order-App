import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContex";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const {
    data,
    error,
    isLoading: isSending,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    hideCheckout();
  }

  function handleFinish() {
    hideCheckout();
    clearCart();
    clearData();
  }

  //Data collection from the Checkout FORM:
  function handleForm(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries(fd));

    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      })
    ),
      // fetch("http://localhost:3000/orders", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     order: {
      //       items: items,
      //       customer: customerData,
      //     },
      //   }),
      //   headers: { "Content-Type": "application/json" },
      // });

      console.log(customerData);
  }

  let actions = (
    <>
      <Button
        type="button"
        textOnly={true}
        onClick={handleClose}
        onClose={handleClose}
      >
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending Order to the KITCHEN...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Order Placed!</h2>
        <p>Sit back and relax...</p>
        <p>We will get back shortly via message!</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Close</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={hideCheckout}>
      <form onSubmit={handleForm}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        {error && <Error title="Failed to submit your order" message={error} />}
        <p className="modal-action">{actions}</p>
      </form>
    </Modal>
  );
}
