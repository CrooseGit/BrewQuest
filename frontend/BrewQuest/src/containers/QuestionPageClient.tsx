import { useEffect, useState } from 'react';
import axios from 'axios';
import '../containers/QuestionPageClient.css';
const QuestionPageClient = () => {
  const [question_index, setQuestion_index] = useState(0);

  const [prompts, setPrompts] = useState(['Loading']);

  const [time, setTime] = useState(0);

  type Question = {
    prompt: string;
    index: number;
  };

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/questions/')
      .then((response) => {
        setTime(response.data.time);
        setPrompts(
          response.data.questions.map((question: Question) => question.prompt)
        );
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
  return (
    <div className='box'>
      <div className='topBar d-flex justify-content-between'>
        <div>
          <h5 className='text p-2'>Round 3</h5>
        </div>
        <div>
          <h5 className='text p-2'>
            {Math.floor(time / 60)}:{time - Math.floor(time / 60) * 60}
          </h5>
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
              if (question_index != prompts.length-1)
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
