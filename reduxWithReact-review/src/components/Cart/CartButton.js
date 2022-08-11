import classes from './CartButton.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const disPatch = useDispatch();
  const cartTotalQuantity = useSelector(state=>state.cart.totalQuantity)

  const toggleCartHandler = () => {
    disPatch(uiActions.toggleCart())  
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartTotalQuantity}</span>
    </button>
  );
};

export default CartButton;
