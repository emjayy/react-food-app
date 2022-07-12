import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import Notification from "./components/UI/Notification";

import { uiActions } from "./store/ui-slice";

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);

  const showCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  const hideCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {showCart && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
