import Button from '../button';
import './styles.scss';

const ProductCard = ({ product }) => {
  const { id, name, imageUrl, price } = product;
  return (
    <div className='productCardContainer' id={id}>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <Button buttonType={'inverted'}>Add to cart</Button>
    </div>
  );
};
export default ProductCard;
