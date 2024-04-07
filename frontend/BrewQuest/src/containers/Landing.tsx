//this is the landing page
import { Link } from 'react-router-dom';
import '../containers/index.css';

const Landing = () => {
  return (
    <div className='landing-container'>
      <Link to='/gamepin' className='btn btn-primary join-btn'>
        Join Game
      </Link>
      <Link to='/host/login' className='btn btn-primary host-btn'>
        Host Game
      </Link>
    </div>
  );
};

export default Landing;
