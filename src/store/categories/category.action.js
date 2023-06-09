import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTIONS_TYPES } from "./category.types";

// export const setCategories = (categories) => createAction(CATEGORIES_ACTIONS_TYPES.SET_CATEGORIES, categories);

export const fetchCategoriesStart = () => createAction( CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_START );

export const fetchCategoriesSuccess = ( categories ) => createAction( CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_SUCCCESS, categories );

export const fetchCategoriesFailed = ( error ) => createAction( CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_FAILED, error );