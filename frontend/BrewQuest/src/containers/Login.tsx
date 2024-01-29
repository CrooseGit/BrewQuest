import BackButton from '../components/BackButton/BackButton';
import '../containers/Login.css';
const Login = () => {
  const handleBackButtonClick = () => {
    // Replace this with actual functionality when other view exists
    console.log('Going Back');
  };

  return (
    <>
      <BackButton onClick={handleBackButtonClick} />
      <div>
        <h1>BrewQuest</h1>
      </div>
      <div className='container login-form'>
        <form>
          <div className='mb-3'>
            <label htmlFor='email_input' className='form-label'>
              Email address
            </label>
            <input type='email' className='form-control' id='email_input' />
          </div>
          <div className='mb-3'>
            <label htmlFor='input_password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='input_password'
            />
          </div>
          <button type='button' className='btn btn-primary'>
            Login
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
