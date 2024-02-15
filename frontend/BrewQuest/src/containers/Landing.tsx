//this is the landing page

const Landing = () => {
  return (
    <div className='btn-container container-size center-elements'>

      <button className='btn btn-primary' id='join-btn'>
        <h1 className='style-text display-1'>Join Game</h1>
      </button>

      <button type='button' className='btn btn-primary' id='host-btn'>
        <h2 className='style-text'>Host Game</h2>
      </button>

    </div>
  );
};

export default Landing;
