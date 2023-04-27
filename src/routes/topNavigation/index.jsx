import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
// getting data from redux:
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/index';
import CartIcon from '../../components/carticon';
import CartDropdown from '../../components/cartDropdown';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';
import { useDispatch } from 'react-redux';
import './styles.scss';


const TopNavigation = () => {

  const currentUser = useSelector( selectCurrentUser );
  const isCartOpen = useSelector( selectIsCartOpen );
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch( signOutStart() );
  };

  const toggleSelected = ( e ) => {
    const element = e.target;
    const isLogo = element.closest( '.navigationLogo' );
    if ( element.className === 'navigationLink' || isLogo ) {
      // clear all tags b4 adding to specific element:
      const links = document.querySelectorAll( '.navigationLink' );
      links.forEach( ( link ) => link.classList.remove( 'selected' ) );
      if ( isLogo ) {
        links[ 0 ].classList.add( 'selected' );
        return;
      }
      element.classList.add( 'selected' );
    }
  };

  return (
    <Fragment>
      <div className='navigationContainer' onClick={ ( e ) => toggleSelected( e ) }>
        <Link className='navigationLogo' to='/'>
          <Logo>Logo</Logo>
        </Link>
        <div className='navigationLinks'>
          <Link className='navigationLink selected' to='/'>
            Home
          </Link>
          <Link className='navigationLink' to='/shop'>
            Shop
          </Link>
          <Link className='navigationLink' to='/'>
            Home
          </Link>
          { currentUser ? (
            <span className='navigationLink' onClick={ signOutHandler }>
              Sign Out
            </span>
          ) : (
            <Link className='navigationLink' to='/sign-in'>
              Sign In
            </Link>
          ) }
          <CartIcon />
        </div>
        { isCartOpen && <CartDropdown /> }
      </div>
      <Outlet />
    </Fragment>
  );
};
export default TopNavigation;
