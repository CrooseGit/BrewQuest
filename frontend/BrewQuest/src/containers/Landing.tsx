//this is the landing page
import '../containers/Landing.css';
const Landing = () => {
  return (
    <div className='container text-center'>
      <button className='btn btn-primary' id='join-btn'>
        <h1 className='text display-1'>Join Game</h1>
      </button>
      <button type='button' className='btn btn-primary' id='host-btn'>
        <h2 className='text'>Host Game</h2>
      </button>
    </div>
  );
};

export default Landing;
