import SignUpForm from '../../components/signUpForm';
import SignInForm from '../../components/signInForm';
import './styles.scss';
const SignIn = () => {
  return (
    <div className='authenticationContainer'>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default SignIn;
