import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

// Custom Action Creator Thunk
export const submitOrder = (userData, cart) => {
  return async (dispatch) => {
    const submitData = async () => {
      const response = await fetch(
        "https://food-app-67a27-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cart,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await submitData();
        dispatch(cartActions.toggleIsSubmitting());
        dispatch(cartActions.toggleDidSubmit());
        dispatch(cartActions.clearCart());
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Unable to submit order!",
        })
      );
    }
  };
};
