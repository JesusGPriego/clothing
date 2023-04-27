import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormInput from '../formInput';
import Button from '../button';
import { signUpStart } from '../../store/user/user.action';
import './styles.scss';

const formDefaultValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [ formData, setFormData ] = useState( formDefaultValues );
  const { displayName, email, password, confirmPassword } = formData;
  const dispatch = useDispatch();
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

  const handleSubmit = ( event ) => {
    event.preventDefault();
    // 1. confirm that password matches
    if ( !password === confirmPassword ) {
      alert( 'passwords dont match' );
      return;
    }
    try {
      // 2. see if we authenticated the user with email and password
      dispatch( signUpStart(
        email,
        password
      ) );
      resetForm();
    } catch ( error ) {
      if ( error.code === 'auth/email-already-in-use' ) {
        alert( 'user already in use' );
      }
      console.log( 'error in user sign up ->', error );
    }
  };

  return (
    <div className='signUpFormContainer'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={ handleSubmit }>
        <FormInput
          label='Display Name'
          name='displayName'
          type='text'
          required
          onChange={ handleChange }
          value={ displayName }
        />
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
        <FormInput
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          required
          onChange={ handleChange }
          value={ confirmPassword }
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};
export default SignUpForm;
