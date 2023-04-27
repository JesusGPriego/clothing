import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from "../../utils/firebase";
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORIES_ACTIONS_TYPES } from './category.types';

export function* fetchCategoriesAsync () {
    try {
        const categoriesArray = yield call( getCategoriesAndDocuments );
        yield put( fetchCategoriesSuccess( categoriesArray ) );
    } catch ( error ) {
        yield put( fetchCategoriesFailed( error ) );
    }
}

export function* onFetchCategory () {
    yield takeLatest( CATEGORIES_ACTIONS_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync );
};

export function* categoriesSaga () {
    yield all( [ call( onFetchCategory ) ] );
};