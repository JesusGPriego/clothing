import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectIsLoading } from '../../store/categories/category.selector';
import { useState } from 'react';
import { useEffect } from 'react';
import Spinner from '../../components/spinner';
import ProductCard from '../../components/productCard';
import './styles.scss';

const Category = () => {
  const categoriesMap = useSelector( selectCategoriesMap );
  const isLoading = useSelector( selectIsLoading );
  const { category } = useParams();
  const [ products, setProducts ] = useState( categoriesMap[ category ] );

  useEffect( () => {
    setProducts( categoriesMap[ category ] );
  }, [ category, categoriesMap ] );
  return (
    <>
      <h2 className='categoryTitle'>{ category.toUpperCase() }</h2>
      {
        isLoading
          ? <Spinner />
          : (
            <div className='categoryContainer'>
              { products &&
                products.map( ( product ) => (
                  <ProductCard key={ product.id } product={ product } />
                ) ) }
            </div>
          )
      }
    </>
  );
};

export default Category;
