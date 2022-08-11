import classes from './CartButton.module.css';
import {useDispatch} from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const disPatch = useDispatch();

  const toggleCartHandler = () => {
    disPatch(uiActions.toggleCart())  
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
