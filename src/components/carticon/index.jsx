import { ReactComponent as ShopingIcon } from '../../assets/shopingBag.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount, selectIsCartOpen, selectCartItems } from '../../store/cart/cart.selector';
import './styles.scss';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)
  const toggleCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen))
  }

  return (
    <div
      onClick={() => toggleCartOpen(!isCartOpen)}
      className='cartIconContainer'
    >
      <ShopingIcon className='shoppingIcon' />
      <span className='itemCount'>{cartCount}</span>
    </div>
  );
};
export default CartIcon;
