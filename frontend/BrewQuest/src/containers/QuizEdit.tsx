import BackButton from '../components/BackButton/BackButton';
import { Form, FormControl, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../containers/QuizEdit.css';

const QuizEdit = () => {
  const handleBackButtonClick = () => {
    // Replace this with actual functionality when other view exists
    console.log('Going Back');
  };

  const handleSaveButtonClick = () => {
    // Replace this with actual functionality when other view exists
    console.log('Saving Quiz');
  };

  return (
    <div className='box'>
      <div className='header'>
        <Link to="../"><BackButton onClick={handleBackButtonClick} className='text' /></Link>
        <h1 className='title'>Quiz Title</h1>
        <Button onClick={handleSaveButtonClick}>Save & Exit</Button>
      </div>

      <div className='round'>
        <Form.Select>
        <option value="1">Round 1</option>
        <option value="2">Round 2</option>
        <option value="3">Round 3</option>
        </Form.Select>
      </div>

      <div className='scrollMenu'>
        <button type='button' className='btn questionButton'>
          <h4>Q1</h4>
        </button>
        <button type='button' className='btn questionButton'>
          <h4>Q2</h4>
        </button>
        <button
          type='button'
          className='btn questionButton'
          id='selectedButton'
        >
          <h4>Q3</h4>
        </button>
        <button type='button' className='btn questionButton'>
          <h4>Q4</h4>
        </button>
        <button type='button' className='btn questionButton'>
          <h4>Q5</h4>
        </button>
        <button type='button' className='btn questionButton'>
          <h4>Q6</h4>
        </button>
        <button type='button' className='btn questionButton'>
          <h4>Q7</h4>
        </button>
        <button type='button' className='btn questionButton'>
          <h4>Q8</h4>
        </button>
      </div>

      <div className='question'>
        <Form.Label>Question</Form.Label>
        <FormControl
          size='lg'
          id="questionInput"
          defaultValue={"What's the capital of Switzerland?"}
        />
      </div>

      <div className='questionDiv'>

        <div>
          <form>
            <input
              id='textInput'
              type='text'
              className='form-control'
              placeholder='Your answer goes here...'
            />
          </form>
        </div>
        <div className='d-flex justify-content-center'>
          <button type='button' className='btn btn-lg submitButton'>
            <h2 className='text'>Submit</h2>
          </button>
        </div>
      </div>

      <div className='d-flex justify-content-between navigationButtons'>
        <div className='p-2'>
          <button type='button' className='btn btn-lg'>
            <h3>&lt; Back</h3>
          </button>
        </div>
        <div className='p-2'>
          <button type='button' className='btn btn-lg'>
            <h3>Next &gt;</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizEdit;
