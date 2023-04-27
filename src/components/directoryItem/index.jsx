import './styles.scss';

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  return (
    <div className='directoryItemContainer'>
      <div
        className='bgImage'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className='directoryItemBody'>
        <h2 className='directoryItemTitle'>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};
export default DirectoryItem;
