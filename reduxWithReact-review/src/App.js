import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./store/ui-slice";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartDataFromSlice } from './store/cart-slice';

let isInitial = true;
{/* 컴포넌트가 렌더될 때 다시 초기화되지 않고, 파일이 parse될 때 초기화 되도록 컴포넌트 외부에 선언 및 초기화 */}


function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    // const sendCartData = async () => {
      // dispatch(
      //   uiActions.showNotification({
      //     status: "pending",
      //     title: "Sending..",
      //     message: "Sending Cart Data!",
      //   })
      // );

      // const response = await fetch(
      //   "https://react-withredux-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
      //   {
      //     method: "PUT",
      //     body: JSON.stringify(cart),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error();
      // }

      // dispatch(
      //   uiActions.showNotification({
      //     status: "success",
      //     title: "Success!",
      //     message: "Sent Cart Data successfully!",
      //   })
      // );
    // };

    if(isInitial){
      isInitial = false;
      return;
    }

    // sendCartData().catch((error) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: "error",
    //       title: "Error!",
    //       message: "Sending Cart Data failed!",
    //     })
    //   );
    // });

    dispatch(sendCartDataFromSlice(cart))

  }, [cart, dispatch]);
  {
    /* dispatch 함수도 react-redux에 의해 불변성을 보장받은 함수 >> 외부에서 받은 의존성으로 안전하게 사용 가능
      참조형 문제가 발동할 수 있으나, 불변성 보장이므로 useCallback() 사용하지 않아도 됨 */
  }

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
