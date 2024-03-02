import BackButton from '../components/BackButton/BackButton';
import '../containers/Login.css';
import { MouseEvent, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log('test');
    const user = {
      username: username,
      password: password,
    };
    try {
      const { data } = await axios.post('http://localhost:8000/token/', user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data['access']}`;
      window.location.href = '/host/QuizList';
    } catch (error) {
      window.alert('Invalid Credentials');
    }
  };

  return (
    <>
      <Link to='../'>
        <BackButton className='text' />
      </Link>
      <div>
        <h1 className='text display-1'>BrewQuest</h1>
      </div>
      <div className='container login-form'>
        <form>
          <div className='mb-3'>
            <label htmlFor='username_input' className='form-label text'>
              Username
            </label>
            <input
              type='username'
              className='form-control'
              id='username_input'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='input_password' className='form-label text'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='input_password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='d-grid gap-2 col-6 mx-auto'>
            <button
              className='btn btn-primary login-btn'
              type='button'
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
