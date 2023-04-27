import './styles.scss';
const Button = ({ children, buttonType, ...otherProps }) => {
  const BUTTON_TYPES = {
    google: 'googleSignIn',
    inverted: 'inverted',
  };

  return (
    <button
      className={`buttonContainer ${BUTTON_TYPES[buttonType] || ''}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
