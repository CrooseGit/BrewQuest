<<<<<<< HEAD
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../containers/QuestionPageClient.css';
const QuestionPageClient = () => {
  const [question_index, setQuestion_index] = useState(0);

  const [prompts, setPrompts] = useState(['Loading']);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/questions/')
      .then((response) => {
        setPrompts(response.data.questions);
        setAnswers(new Array(prompts.length).fill(''));
        setSubmitted(new Array(prompts.length).fill(false));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [prompts.length]);

  const [answers, setAnswers] = useState(new Array(prompts.length).fill(''));

  const [isSubmitted, setSubmitted] = useState(
    new Array(prompts.length).fill(false)
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
=======
import '../containers/QuestionPageClient.css';
const QuestionPageClient = () => {
>>>>>>> TylerRouting
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
<<<<<<< HEAD
          <button
            type='button'
            className='btn p-2 submitAllButton'
            onClick={() => alert('Takes user to waiting screen')}
          >
=======
          <button type='button' className='btn p-2 submitAllButton'>
>>>>>>> TylerRouting
            <h5 className='text'>Submit All</h5>
          </button>
        </div>
      </div>
      <div className='scrollMenu'>
<<<<<<< HEAD
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
=======
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
>>>>>>> TylerRouting
      </div>

      <div className='questionDiv'>
        <div>
<<<<<<< HEAD
          <h1 className='text questionText'>{prompts[question_index]}</h1>
=======
          <h1 className='text questionText'>
            What's the capital of Switzerland?
          </h1>
>>>>>>> TylerRouting
        </div>

        <div>
          <form>
            <input
              id='textInput'
              type='text'
              className='form-control'
<<<<<<< HEAD
              disabled={isSubmitted[question_index]}
              placeholder='Your answer goes here...'
              value={answers[question_index]}
              onChange={(e) => handleAnswerInputChange(e.target.value)}
=======
              placeholder='Your answer goes here...'
>>>>>>> TylerRouting
            />
          </form>
        </div>
        <div className='d-flex justify-content-center'>
<<<<<<< HEAD
          <button
            type='button'
            className='btn btn-lg submitButton'
            onClick={() => handleSubmitClicked()}
          >
=======
          <button type='button' className='btn btn-lg submitButton'>
>>>>>>> TylerRouting
            <h2 className='text'>Submit</h2>
          </button>
        </div>
      </div>

      <div className='d-flex justify-content-between navigationButtons'>
        <div className='p-2'>
<<<<<<< HEAD
          <button
            type='button'
            className='btn btn-lg'
            onClick={() => {
              if (question_index != 0) setQuestion_index(question_index - 1);
            }}
          >
=======
          <button type='button' className='btn btn-lg'>
>>>>>>> TylerRouting
            <h3>&lt; Back</h3>
          </button>
        </div>
        <div className='p-2'>
<<<<<<< HEAD
          <button
            type='button'
            className='btn btn-lg'
            onClick={() => {
              if (question_index != prompts.length)
                setQuestion_index(question_index + 1);
            }}
          >
=======
          <button type='button' className='btn btn-lg'>
>>>>>>> TylerRouting
            <h3>Next &gt;</h3>
          </button>
        </div>
      </div>
    </div>
  );
};
export default QuestionPageClient;
