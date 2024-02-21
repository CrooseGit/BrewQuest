//this is the landing page
import { Link } from 'react-router-dom';
import '../containers/Landing.css';
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className='container text-center'>
      <Link to="/gamepin" style={{ textDecoration: 'none' }}>
        <button className='btn btn-primary' id='join-btn'>
          <h1 className='text display-1'>Join Game</h1>
        </button>
      </Link>
      <Link to="/Login" style={{ textDecoration: 'none' }}>
      <button type='button' className='btn btn-primary' id='host-btn'>
<<<<<<< HEAD
      <Link to="/Login"><h2 className='text'>Host Game</h2></Link>
        
        
=======
          <h2 className='text'>Host Game</h2>
>>>>>>> quiz-edit-page
      </button>
      </Link>
    </div>
  );
};

export default Landing;
