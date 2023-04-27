import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import { addItemToCart, subtractItemToCart, removeItemFromCart } from '../../store/cart/cart.action';
import CheckoutItem from '../checkoutItem';
import './styles.scss';

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  console.log('cartItems en checkout ->', cartItems);
  const cartTotal = useSelector(selectCartTotal);

  const getItemId = (e) => {
    return Number(e.target.closest('.checkoutItemContainer').id);
  };

  const checkoutItemUpdatingHandler = (e) => {
    e.preventDefault();
    const classname = e.target.className;
    switch (classname) {
      case 'removeButton':
        removeItem(getItemId(e));
        break;
      case 'increment':
        increaseItem(getItemId(e));
        break;
      case 'decrement':
        decreaseItem(getItemId(e));
        break;
      default:
        break;
    }
  };

  const increaseItem = (itemId) => {
    const itemToIncrease = cartItems.findIndex((item) => item.id === itemId);
    dispatch(addItemToCart(cartItems, cartItems[itemToIncrease]));
  };
  const decreaseItem = (itemId) => {
    const itemToIncrease = cartItems.findIndex((item) => item.id === itemId);
    dispatch(subtractItemToCart(cartItems, cartItems[itemToIncrease]));
  };
  const removeItem = (itemId) => {
    const itemToIncrease = cartItems.findIndex((item) => item.id === itemId);
    dispatch(removeItemFromCart(cartItems, cartItems[itemToIncrease]));
  };

  const headerTitle = ['Product', 'Description', 'Quantity', 'Price', 'Remove'];
  return (
    <div onClick={checkoutItemUpdatingHandler} className='checkoutContainer'>
      <div className='checkoutHeader'>
        {headerTitle.map((title, idx) => (
          <div key={idx} className='headerBlock'>
            <span>{title}</span>
          </div>
        ))}
      </div>
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <span className='total'>Total: {cartTotal}</span>
    </div>
  );
};

export default Checkout;
