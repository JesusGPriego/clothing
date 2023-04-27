import ProductCard from '../productCard';
import './styles.scss';

const CategoryPreview = ({ title, products }) => {
  return (
    <div className='cateogryPreviewContainer'>
      <h2>
        <span className='categoryPreviewTitle'>{title.toUpperCase()}</span>
      </h2>
      <div className='preview'>
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default CategoryPreview;
