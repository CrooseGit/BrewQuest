import BackButton from '../components/BackButton/BackButton';
import '../containers/Login.css';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const navigate = useNavigate();
  const handleBackButtonClick =  async() => {
    // Replace this with actual functionality when other view exists
    console.log('Going Back');
    navigate('../');
=======
import { Link } from "react-router-dom";

const Login = () => {

  const handleBackButtonClick =  () => {
    // Replace this with actual functionality when other view exists
    console.log('Going Back');
>>>>>>> TylerRouting
  
  };

  const handleSubmit = () =>{
<<<<<<< HEAD

=======
    console.log('Submitting');
>>>>>>> TylerRouting
  }

  return (
    <>
      <Link to="../"><BackButton onClick={handleBackButtonClick} className='text' /></Link>
      <div>
        <h1 className='text display-1'>BrewQuest</h1>
      </div>
      <div className='container login-form'>
        <form onSubmit={handleSubmit}>
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
          <div className='d-grid gap-2 col-6 mx-auto'>
<<<<<<< HEAD
            <button
              type='submit'
              className='btn btn-primary btn-lg'
              id='login-btn'
            >
              Login
            </button>
=======
            <Link to='/QuizList' className='btn btn-primary btn-lg'>
              <button
                type='submit'
                id='login-btn'
              >
                Login
              </button>
            </Link>
>>>>>>> TylerRouting
          </div>
        </form>

      </div>
    </>
  );
};
export default Login;
