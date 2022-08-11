import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const { id, title, price, description } = props;

  const dispatch = useDispatch();

  const addItemToCartHandler = () => {
    dispatch(cartActions.addItemToCart({
      id: props.id,
      title: props.title,
      price: props.price,
    }));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>₩{price.toFixed(0)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addItemToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
