//this is the landing page
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='btn-container container-size center-text'>
      <Link to='/gamepin' style={{ textDecoration: 'none' }}>
        <button className='btn btn-primary' id='join-btn'>
          <h1 className='style-text display-1'>Join Game</h1>
        </button>
      </Link>
      <Link to='/host/login' style={{ textDecoration: 'none' }}>
        <button type='button' className='btn btn-primary' id='host-btn'>
          <h2 className='text'>Host Game</h2>
        </button>
      </Link>
    </div>
    
  );
};

export default Landing;
