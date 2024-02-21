import { useState } from 'react';
import '../containers/QuestionPageClient.css';
const QuestionPageClient = () => {
  const [question_index, setQuestion_index] = useState(0);
  const prompts = [
    'What is the capital of Switzerland?',
    'Who is the reigning monarch of the U.K?',
    'Why did the chicken cross the road?',
    'Who was the 44th president of the U.S?',
    "Who directed the movie 'The Hangover'?",
  ];
  const number_of_questions = prompts.length;
  const [answers, setAnswers] = useState(
    new Array(number_of_questions).fill('')
  );

  const [isSubmitted, setSubmitted] = useState(
    new Array(number_of_questions).fill(false)
  );

  const handleAnswerInputChange = (input: string) => {
    const a = JSON.parse(JSON.stringify(answers));
    a[question_index] = input;
    setAnswers(a);
  };

  const handleSubmitClicked = () => {
    const s = JSON.parse(JSON.stringify(isSubmitted));
    s[question_index] = true;
    setSubmitted(s);
  };
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
          <button
            type='button'
            className='btn p-2 submitAllButton'
            onClick={() => alert('Takes user to waiting screen')}
          >
            <h5 className='text'>Submit All</h5>
          </button>
        </div>
      </div>
      <div className='scrollMenu'>
        {prompts.map((_prompt, index) => (
          <button
            type='button'
            className='btn questionButton'
            id={index == question_index ? 'selectedButton' : ''}
            key={'button_' + index}
            onClick={() => {
              setQuestion_index(index);
            }}
          >
            <h4>Q{index + 1}</h4>
          </button>
        ))}
      </div>

      <div className='questionDiv'>
        <div>
          <h1 className='text questionText'>{prompts[question_index]}</h1>
        </div>

        <div>
          <form>
            <input
              id='textInput'
              type='text'
              className='form-control'
              disabled={isSubmitted[question_index]}
              placeholder='Your answer goes here...'
              value={answers[question_index]}
              onChange={(e) => handleAnswerInputChange(e.target.value)}
            />
          </form>
        </div>
        <div className='d-flex justify-content-center'>
          <button
            type='button'
            className='btn btn-lg submitButton'
            onClick={() => handleSubmitClicked()}
          >
            <h2 className='text'>Submit</h2>
          </button>
        </div>
      </div>

      <div className='d-flex justify-content-between navigationButtons'>
        <div className='p-2'>
          <button
            type='button'
            className='btn btn-lg'
            onClick={() => {
              if (question_index != 0) setQuestion_index(question_index - 1);
            }}
          >
            <h3>&lt; Back</h3>
          </button>
        </div>
        <div className='p-2'>
          <button
            type='button'
            className='btn btn-lg'
            onClick={() => {
              if (question_index != number_of_questions)
                setQuestion_index(question_index + 1);
            }}
          >
            <h3>Next &gt;</h3>
          </button>
        </div>
      </div>
    </div>
  );
};
export default QuestionPageClient;
