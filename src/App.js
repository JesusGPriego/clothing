import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { checkUserSession } from './store/user/user.action';
import Home from './routes/home';
import TopNavigation from './routes/topNavigation';
import SignIn from './routes/authentication';
import Shop from './components/shop';
import Checkout from './components/checkout';
import './App.css';

function App () {

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( checkUserSession() );
  }, [ dispatch ] );
  return (
    <Routes>
      <Route path='/' element={ <TopNavigation /> }>
        <Route index element={ <Home /> } />
        <Route path='shop/*' element={ <Shop /> } />
        <Route path='sign-in' element={ <SignIn /> } />
        <Route path='checkout' element={ <Checkout /> } />
      </Route>
    </Routes>
  );
}

export default App;
