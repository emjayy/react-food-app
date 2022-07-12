import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { cartActions } from "../../store/cart-slice";
import { submitOrder } from "../../store/cart-actions";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";
import LoadingSpinner from "../UI/LoadingSpinner";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const dispatch = useDispatch();

  const isSubmitting = useSelector((state) => state.cart.isSubmitting);
  const didSubmit = useSelector((state) => state.cart.didSubmit);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalAmountDisplay = `$${totalAmount.toFixed(2)}`;

  const cart = useSelector((state) => state.cart.items);
  const cartPopulated = cart.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const cartItemAddHandler = (item) => {
    dispatch(
      cartActions.addItemToCart({
        id: item.id,
        name: item.name,
        amount: 1,
        price: item.price,
      })
    );
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    dispatch(cartActions.toggleIsSubmitting());
    dispatch(submitOrder(userData, cart));
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={() => cartItemRemoveHandler(item.id)}
          onAdd={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {cartPopulated && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmountDisplay}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = (
    <div className={classes.centered}>
      <LoadingSpinner />
    </div>
  );

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Order successfully sent!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
