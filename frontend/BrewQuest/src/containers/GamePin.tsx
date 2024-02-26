import BackButton from '../components/BackButton/BackButton';
import {Link} from "react-router-dom";
import '../index.css'
const GamePin = () => {
  const handleBackButtonClick = () => {
    // Replace this with actual functionality when other view exists
    console.log('Going Back');
  };

  return (
    <>
      <Link to="../"><BackButton onClick={handleBackButtonClick} className='text' /></Link>
      <div>
        <h1 className='text display-1'>Game Pin</h1>
      </div>
      <div className='container gamepin'>
        <form>
          <div className='mb-3'>
            <input type='number' className='form-control' placeholder="Insert game pin here" id='input-txtbox' />
          </div>
          <div className='d-grid gap-2 col-6 mx-auto'>
            <button
              type='button'
              className='btn btn-primary btn-lg'
              id='confirm-btn'
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default GamePin;
