import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAoSjbkymQ3E2vFAqCLi2BOo8hSqnRzPQk',
  authDomain: 'clothing-db599.firebaseapp.com',
  projectId: 'clothing-db599',
  storageBucket: 'clothing-db599.appspot.com',
  messagingSenderId: '830997322710',
  appId: '1:830997322710:web:9e33680672eb56390f2277',
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );

const provider = new GoogleAuthProvider();
provider.setCustomParameters( {
  propmpt: 'select_account',
} );

export const auth = getAuth();
export const loginWithGooglePopup = () => signInWithPopup( auth, provider );

// db init
const db = getFirestore();

export const createUserDocumentFromAuth = async ( userAuth, rest ) => {
  const userDocRef = doc( db, 'users', userAuth.uid );
  const userSnapshot = await getDoc( userDocRef );
  console.log( 'snapshot ->', userSnapshot.exists() );
  //   if user data exists:
  if ( !userSnapshot.exists() ) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc( userDocRef, {
        displayName,
        email,
        createdAt,
        ...rest,
      } );
    } catch ( error ) {
      console.log( 'error setting doc: ', error );
    }
  }
  // else: return the userDocRef
  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async ( email, password ) => {
  if ( !email || !password ) {
    return;
  }
  return await createUserWithEmailAndPassword( auth, email, password );
};

export const loginWithEmailAndPassword = async ( email, password ) => {
  return await signInWithEmailAndPassword( auth, email, password );
};

export const signOutUser = () => signOut( auth );

export const onAuthStateChangedListener = ( callback ) =>
  onAuthStateChanged( auth, callback );

export const addCollectionAndDocument = async ( collectionKey, objectsToAdd ) => {
  const collectionRef = collection( db, collectionKey );
  const batch = writeBatch( db );
  objectsToAdd.forEach( ( object ) => {
    const docRef = doc( collectionRef, object.title.toLowerCase() );
    batch.set( docRef, object );
  } );
  await batch.commit();
  console.log( 'products added to db' );
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection( db, 'categories' );
  const categorieQuery = query( collectionRef );
  const querySnapshot = await getDocs( categorieQuery );

  return querySnapshot.docs.map( docSnapshot => docSnapshot.data() );
};

export const getCurrentUser = () => {
  return new Promise( ( resolve, reject ) => {
    const unsubscribe = onAuthStateChanged( auth, ( userAuth ) => {
      unsubscribe();
      resolve( userAuth );
    },
      reject );
  } );
};