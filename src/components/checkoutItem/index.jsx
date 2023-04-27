import './styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  return (
    <div id={id} className='checkoutItemContainer'>
      <div className='imageContainer'>
        <img src={imageUrl} alt={name} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='decrement'>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='increment'>&#10095;</div>
      </span>
      <span className='price'>{price}</span>
      <div className='removeButton'>&#10005;</div>
    </div>
  );
};

export default CheckoutItem;
