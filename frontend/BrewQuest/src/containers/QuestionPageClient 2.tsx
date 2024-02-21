import '../containers/QuestionPageClient.css';
const QuestionPageClient = () => {
  return (
    <div className='box'>
      <div className='topBar d-flex justify-content-between'>
        <div>
          <h5 className='text p-2'>Round 3</h5>
        </div>
        <div>
          <h5 className='text p-2'>10:11</h5>
        </div>
        <div>
          <button type='button' className='btn p-2 submitAllButton'>
            <h5 className='text'>Submit All</h5>
          </button>
        </div>
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

      <div className='questionDiv'>
        <div>
          <h1 className='text questionText'>
            What's the capital of Switzerland?
          </h1>
        </div>

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
export default QuestionPageClient;
