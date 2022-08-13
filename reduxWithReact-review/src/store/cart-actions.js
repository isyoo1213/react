import { uiActions } from "./ui-slice";
import { cartActions } from './cart-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-withredux-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if(!response.ok){
        throw new Error('Could not Fetch Cart-data');
      }

      const data = await response.json()

      return data;
    };

    try{
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
        itemsTotalPrice: cartData.itemsTotalPrice
      }))
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching Cart Data failed!",
        })
      );
    }

  };
};

export const sendCartDataFromFn = (cartData) => {
  return async (dispatch) => {
    {
      /* dispatch()를 실행하기 전에 asynchronous task/side-effect 수행 가능
        >> 아직 reducer에 도착하지 않았기 때문에 + 현재 위치는 slice나 reducer 내부도 아닌 독립적인 JS 함수*/
    }
    {
      /* 객체 타입을 반환하는 리듀서를 직접 사용하는 것이 아니라도, 
        위의 'dispatch' 인자를 통해 함수 자체를 반환해 그 안의 dispatch를 실행해 reducer에 전달하기 위한 인자들을 자동으로 설정해줌 >> 즉 부수효과를 동반하는 작업 크리에이터가 필요하다는 패턴을 인식하고 있음 
        + 기존의 reducer는 state, action의 인자가 필요하고, 이를 트리거 할 dispatch에서 payolad인자를 필요로 함
        >> 함수를 actions처럼 사용하는 경우 이렇게 reducer와 dispatch에 사용할 인자들의 설정을 자동으로 해줌*/
    }

    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending..",
        message: "Sending Cart Data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-withredux-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartData.items,
            totalQuantity: cartData.totalQuantity,
            itemsTotalPrice: cartData.itemsTotalPrice
          }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }
    };

    try {
      await sendRequest();
      {
        /* 함수가 중첩되어있는 상태이긴 하지만, sendRequest자체는 async 가능한 함수 
        + 위치 또한 sendCartData가 return하는 함수가 async 가능하므로 await 사용 가능
        + sendRequest()는 promise반환하므로 catch() 사용 가능
        + useEffect() 내에서 처럼 error발생 시 promise 반환을 거부당하지 않으므로 try/catch 구문도 사용 가능
          (useEffect는 클린업 함수를 동기적으로 제공할 수 있어야 함 >> 비동기적인 error 리턴 불가능) */
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent Cart Data successfully!",
        })
      );
    } catch (error) {
      sendCartDataFromFn().catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Sending Cart Data failed!",
          })
        );
      });
    }
  };
};
