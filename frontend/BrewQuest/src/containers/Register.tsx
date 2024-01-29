import BackButton from '../components/BackButton/BackButton';
import '../containers/Login.css';
const Register = () => {
  const handleBackButtonClick = () => {
    // Replace this with actual functionality when other view exists
    console.log('Going Back');
  };

  return (
    <>
      <BackButton onClick={handleBackButtonClick} className='text' />
      <div>
        <h1 className='text display-1'>BrewQuest</h1>
      </div>
      <div className='container login-form'>
        <form>
          <div className='mb-3'>
            <label htmlFor='email_input' className='form-label text'>
              Email address
            </label>
            <input type='email' className='form-control' id='email_input' />
          </div>
          <div className='mb-3'>
            <label htmlFor='input_password' className='form-label text'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='input_password'
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='input_password' className='form-label text'>
              Confirm Password
            </label>
            <input
              type='password'
              className='form-control'
              id='input_password'
            />
          </div>
          <div className='d-grid gap-2 col-6 mx-auto'>
            <button
              type='button'
              className='btn btn-primary btn-lg'
              id='login-btn'
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
