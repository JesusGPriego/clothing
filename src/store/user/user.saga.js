import { all, call, put, takeLatest } from 'redux-saga/effects';
import { USER_ACTIONS_TYPES } from './user.types';
import {
    signInSuccess,
    signInFailed,
    signUpFailed,
    signUpSuccess,
    signOutSuccess,
    signOutFailed,
} from './user.action';

import {
    getCurrentUser,
    createUserDocumentFromAuth,
    loginWithGooglePopup,
    loginWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
} from '../../utils/firebase';



export function* getSnapshotFromUserAuth ( userAuth, additionalDetails ) {
    try {
        const userSnapshot = yield call( createUserDocumentFromAuth, userAuth, additionalDetails );
        yield put( signInSuccess( { id: userSnapshot.id, ...userSnapshot.data() } ) );
    } catch ( error ) {
        yield put( signInFailed( error ) );
    }
}

export function* signInWithEmail ( { payload: { email, password } } ) {
    try {
        const { user } = yield call( loginWithEmailAndPassword, email, password );
        yield call( getSnapshotFromUserAuth, user );
    } catch ( error ) {
        yield put( signInFailed( error ) );
    }
}

export function* signInWithGoogle () {
    try {
        const { user } = yield call( loginWithGooglePopup );
        yield call( getSnapshotFromUserAuth, user );
    } catch ( error ) {
        yield put( signInFailed( error ) );
    }
}

export function* isUserAuthenticated () {
    try {
        const userAuth = yield call( getCurrentUser );
        if ( !userAuth ) return;
        yield call( getSnapshotFromUserAuth, userAuth );
    } catch ( error ) {
        // console.log( 'error ->', error );
        yield put( signInFailed( error ) );
    }
}

export function* signUpWithEmail ( { payload: { email, password } } ) {
    try {
        const userAuth = yield call( createAuthUserWithEmailAndPassword, email, password );
        if ( !userAuth ) return;
        yield put( signUpSuccess() );
    } catch ( error ) {
        yield put( signUpFailed( error ) );
    }
}

export function* signOut () {
    try {
        yield call( signOutUser );
        yield put( signOutSuccess() );
    } catch ( error ) {
        yield put( signOutFailed( error ) );
    }
}

export function* onSignUpStart () {
    yield takeLatest( USER_ACTIONS_TYPES.SIGN_UP_START, signUpWithEmail );
}

export function* onEmailSignInStart () {
    yield takeLatest( USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, signInWithEmail );
}

export function* onGoogleSignInStart () {
    yield takeLatest( USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle );
}

export function* onCheckUserSession () {
    yield takeLatest( USER_ACTIONS_TYPES.CHECK_USER_SESSION, isUserAuthenticated );
}

export function* onSignOutStart () {
    yield takeLatest( USER_ACTIONS_TYPES.SIGN_OUT_START, signOut );
}

export function* userSagas () {
    yield all( [
        call( onCheckUserSession ),
        call( onGoogleSignInStart ),
        call( onEmailSignInStart ),
        call( onSignUpStart ),
        call( onSignOutStart )
    ] );
}