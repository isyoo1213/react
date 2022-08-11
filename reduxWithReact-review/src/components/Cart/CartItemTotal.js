import { useSelector } from "react-redux";

const CartItemTotal = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.itemsTotalPrice);

  return (
    <div>
      <div>
        <h2>Total Amount : </h2>
        <span>{totalQuantity}</span>
      </div>
      <div>
        <h2>Total Price : </h2>
        <span>{totalPrice}</span>
      </div>
    </div>
  );
};

export default CartItemTotal;
