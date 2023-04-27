import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  getCategoriesAndDocuments
} from '../../utils/firebase';
import { fetchCategoriesStart } from '../../store/categories/category.action';
import { useSelector, useDispatch } from 'react-redux';
import CategoriesPreview from '../../routes/categoriesPreview';
import Category from '../../routes/category';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import './styles.scss';
import { selectCartItems } from '../../store/cart/cart.selector';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( fetchCategoriesStart() );
  }, [] );

  const categoriesMap = useSelector( selectCategoriesMap );
  const cartItems = useSelector( selectCartItems );
  const navigation = useNavigate();

  const products = categoriesMap ?
    Object.keys( categoriesMap ).reduce( ( acc, current ) => {
      const items = categoriesMap[ current ];
      return [ ...acc, ...items ];
    }, [] )
    : [];
  const shopClickHandler = ( e ) => {
    // console.log(e.target.tagName);
    e.preventDefault();
    const target = e.target.tagName.toLowerCase();
    if ( target !== 'button' && target !== 'span' ) {
      return;
    }
    switch ( target ) {
      case 'button':
        buttonHandle( e );
        break;
      case 'span':
        goToCategory( e );
        break;

      default:
        break;
    }
  };

  const buttonHandle = ( e ) => {
    const id = e.target.closest( '.productCardContainer' ).id;
    if ( id ) {
      const productToAdd = products.filter( ( item ) => {
        return item.id === Number( id );
      } )[ 0 ];
      dispatch( addItemToCart( cartItems, productToAdd ) );
    }
  };

  const goToCategory = ( e ) => {
    const isCategoryClicked = e.target.className === 'categoryPreviewTitle';
    if ( !isCategoryClicked ) return;
    const categoryClicked = e.target.textContent;
    navigation( `${categoryClicked.toLowerCase()}` );
  };

  return (
    <div onClick={ ( e ) => shopClickHandler( e ) }>
      <Routes>
        <Route index element={ <CategoriesPreview /> } />
        <Route path=':category' element={ <Category /> } />
      </Routes>
    </div>
  );
};
export default Shop;
