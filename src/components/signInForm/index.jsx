import { useState } from 'react';
import FormInput from '../formInput';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';
import Button from '../button';
import { useDispatch } from 'react-redux';
import './styles.scss';

const formDefaultValues = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [ formData, setFormData ] = useState( formDefaultValues );
  const { email, password } = formData;
  const dispatch = useDispatch();
  const logGoogleUser = async () => {
    dispatch( googleSignInStart() );
  };

  const handleChange = ( event ) => {
    const { name, value } = event.target;
    setFormData( {
      ...formData,
      [ name ]: value,
    } );
  };
  const resetForm = () => {
    setFormData( formDefaultValues );
  };

  const handleSubmit = async ( event ) => {
    event.preventDefault();
    if ( email && password ) {
      try {
        dispatch( emailSignInStart( email, password ) );
      } catch ( error ) {
        if (
          error.code === 'auth/wrong-password' ||
          error.code === 'auth/user-not-found'
        ) {
          console.log( 'invalid credentials' );
          return;
        }
        console.log( 'error while login:' );
      }
    }
    resetForm();
  };

  return (
    <div className='signInContainerForm'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={ handleSubmit }>
        <FormInput
          label='Email'
          name='email'
          type='email'
          required
          onChange={ handleChange }
          value={ email }
        />
        <FormInput
          label='Password'
          name='password'
          type='password'
          required
          onChange={ handleChange }
          value={ password }
        />
        <div className='buttonsContainer'>
          <Button type='submit'>Sign in</Button>
          <Button buttonType='google' type='submit' onClick={ logGoogleUser }>
            Sign in with google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
