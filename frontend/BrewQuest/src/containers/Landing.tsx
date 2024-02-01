//this is the landing page
import { Link } from 'react-router-dom';
import '../containers/Landing.css';
const Landing = () => {
  return (
    <div className='container text-center'>
      <button className='btn btn-primary' id='join-btn'>
        <h1 className='text display-1'>Join Game</h1>
      </button>
      <button type='button' className='btn btn-primary' id='host-btn'>
      <Link to="/Login"><h2 className='text'>Host Game</h2></Link>
        
        
      </button>
    </div>
  );
};

export default Landing;
