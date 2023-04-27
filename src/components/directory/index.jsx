import DirectoryItem from '../directoryItem/index';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../categories';
import './styles.scss';

const Directory = () => {
  const navigation = useNavigate();

  const clickHandler = (e) => {
    // get category clicked:
    const isDirectoryItemClicked = e.target.closest('.directoryItemContainer');
    if (!isDirectoryItemClicked) {
      return;
    }

    const categoryClicked = e.target
      .closest('.directoryItemContainer')
      .querySelector('h2').textContent;
    console.log('categoryClicked -> ', categoryClicked);
    navigation(`shop/${categoryClicked}`);
  };

  return (
    <div className='directoryContainer' onClick={(e) => clickHandler(e)}>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
export default Directory;
