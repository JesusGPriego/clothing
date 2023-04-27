import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectIsLoading } from '../../store/categories/category.selector';
import CategoryPreview from '../../components/categoryPreview';
import Spinner from '../../components/spinner';

const CategoriesPreview = () => {
  const categoriesMap = useSelector( selectCategoriesMap );
  const isLoading = useSelector( selectIsLoading );
  return (
    <Fragment>
      {
        isLoading
          ? <Spinner />
          : (
            categoriesMap ? Object.keys( categoriesMap ).map( ( title ) => (
              <Fragment key={ title }>
                <CategoryPreview title={ title } products={ categoriesMap[ title ] } />
              </Fragment>
            ) ) : []
          )
      }
    </Fragment>
  );
};
export default CategoriesPreview;
