import './styles.scss';
const Button = ({ children, buttonType, isLoading, ...otherProps }) => {
  const BUTTON_TYPES = {
    google: 'googleSignIn',
    inverted: 'inverted',
  };

  return (
    <button
      className={`buttonContainer ${BUTTON_TYPES[buttonType] || ''}`}
      disabled={isLoading}
      {...otherProps}
    >
      {isLoading ? <div className='spinnerContainer'></div> : children}
    </button>
  );
};

export default Button;
