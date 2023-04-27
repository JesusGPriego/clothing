import { createContext, useEffect, useReducer } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../../utils/firebase';
import { createAction } from '../../utils/reducer/reducer.utils';

// value I want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// actions:

const USER_ACTIONS_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};


// reducer:

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTIONS_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      };
    default:
      throw new Error(`Unhandled type '${type}' in userReducer`);
  }

};


const initialState = {
  currentUser: null,
};

// component itself
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(userReducer, initialState);

  const { currentUser } = state;

  const setCurrentUser = (user) => {

    dispatch(
      createAction(
        USER_ACTIONS_TYPES.SET_CURRENT_USER,
        user
      )
    );

  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      user && createUserDocumentFromAuth(user);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
