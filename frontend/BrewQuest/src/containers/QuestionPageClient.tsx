import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import ip from '../info';
import '../containers/QuestionPageClient.css';

interface props {
  quizId: number;
  roundIndex: number;
  roundIds: number[];
}

const QuestionPageClient = ({ quizId, roundIndex, roundIds }: props) => {
  // State management
  const [question_index, setQuestion_index] = useState(0);
  const [prompts, setPrompts] = useState(['Loading']);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitted, setSubmitted] = useState<boolean[]>([]);
  const [time, setTime] = useState(0);
  // End

  // const [round, setRound] = useState(0);

  // Define question type
  type Question = {
    prompt: string;
    index: number;
  };
  // End

  // Fetches and sets prompts and answers, updates state of Answers and Submitted with default values
  const clientGetRound = () => {
    console.log('clientGetRound(): ');
    axios
      .post('http://' + ip + ':8000/api/clientGetRound/', {
        round_id: roundIds[roundIndex],
      })
      .then((response) => {
        console.log(response);
        setTime(response.data.round.time);
        setPrompts(
          response.data.questions.map((question: Question) => question.prompt)
        );
        setAnswers(new Array(prompts.length).fill(''));
        setSubmitted(new Array(prompts.length).fill(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // End

  // Runs on startup, and when round Index changed
  useEffect(() => {
    clientGetRound();
  }, [roundIndex]); //[prompts.length]);
  // End

  const handleAnswerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers];
    updatedAnswers[question_index] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const handleSubmitClicked = () => {
    const updatedIsSubmitted = [...isSubmitted];
    updatedIsSubmitted[question_index] = true;
    setSubmitted(updatedIsSubmitted);
  };
  return (
    <div className='box'>
      <div className='topBar d-flex justify-content-between'>
        <div>
          <h5 className='text p-2'>Round {roundIndex + 1}</h5>
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
              onChange={handleAnswerInputChange}
            />
          </form>
        </div>
        <div className='d-flex justify-content-center'>
          <button
            type='button'
            disabled={isSubmitted[question_index]}
            className='btn btn-lg submitButton'
            onClick={handleSubmitClicked}
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
              if (question_index != prompts.length - 1)
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
