import { createContext, useState, useEffect } from 'react';
// import SHOP_DATA from '../../assets/data/shopData.js';
// import { addCollectionAndDocument } from '../../utils/firebase/index';
import { getCategoriesAndDocuments } from '../../utils/firebase/index';

// value I want to access
export const CategoriesContext = createContext({
  categoriesMap: {},
  setCategories: () => null,
});

// component itself
export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap };

  // This was used once just to add data to db.
  // useEffect(() => {
  //   addCollectionAndDocument('categories', SHOP_DATA);
  // }, []);
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
