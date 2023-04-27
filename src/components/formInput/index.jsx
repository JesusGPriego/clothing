import './styles.scss';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='group'>
      <input className='formInput' {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } formInputLabel`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
export default FormInput;
