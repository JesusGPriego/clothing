import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../button';
import CartItem from '../cartItem';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import './index.scss';

const CartDropdown = () => {

  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();


  const navigation = useNavigate();

  const goToCheckout = () => {
    closeDropdown();
    navigation('/checkout');
  };

  const closeDropdown = () => {
    dispatch(setIsCartOpen(false));
  };

  return (
    <div className='cartDropdownContainer'>
      <div className='closeDropdownContainer'>
        <span className='closeDropdown' onClick={closeDropdown}>
          &#10005;
        </span>
      </div>
      <div className='cartItems'>
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button onClick={goToCheckout}>Go To Checkout</Button>
    </div>
  );
};

export default CartDropdown;
