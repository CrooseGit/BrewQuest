import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import ip from '../info';
import '../containers/QuestionPageClient.css';

interface props {
  quizId: number;
  roundIndex: number;
  roundIds: number[];
  livequizhttp: string;
  pin: string;
  timesUp: () => void;
}

const QuestionPageClient = ({
  quizId,
  roundIndex,
  roundIds,
  livequizhttp,
  pin,
  timesUp,
}: props) => {
  // State management
  const [questionIndex, setQuestion_index] = useState(0);
  const [prompts, setPrompts] = useState(['Loading']);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSubmitted, setSubmitted] = useState<boolean[]>([]);
  const [endTime, setEndTime] = useState(new Date(Date.now() + 10000));
  const [timer, setTimer] = useState({ minutes: '00', seconds: '00' });
  // End

  // const [round, setRound] = useState(0);

  // Define question type
  type Question = {
    prompt: string;
    index: number;
  };
  // End

  // Calculates minutes remaining from datetime
  const calculateMinutes = () => {
    const timeLeft = endTime.getTime() - Date.now();
    return Math.floor((timeLeft / 1000 / 60) % 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };
  // End

  // Calculates minutes remaining from datetime
  const calculateSeconds = () => {
    const timeLeft = endTime.getTime() - Date.now();
    return Math.floor((timeLeft / 1000) % 60).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };
  // End

  // Fetches and sets prompts and answers, updates state of Answers and Submitted with default values
  const clientGetRound = () => {
    console.log('clientGetRound(): ');
    const payload = {
      pin: pin,
      round_id: roundIds[roundIndex],
    };
    axios
      .post(livequizhttp + 'clientGetRound/', payload)
      .then((response) => {
        console.log(response);
        console.log('end_time ', new Date(Date.parse(response.data.end_time)));
        setEndTime(new Date(Date.parse(response.data.end_time)));
        setPrompts(
          response.data.questions.map((question: Question) => question.prompt)
        );
        setAnswers(new Array(response.data.questions.length).fill(''));
        setSubmitted(new Array(response.data.questions.length).fill(false));
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

  // Controls timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (endTime.getTime() - Date.now() <= 0) {
        console.log('end', endTime.getTime() - Date.now());
        clearInterval(timerInterval);
        timesUp();
      }
      setTimer({ minutes: calculateMinutes(), seconds: calculateSeconds() });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [endTime]);
  // End

  const handleAnswerInputChange = (a: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = a;
    setAnswers(updatedAnswers);
  };

  const handleSubmitClicked = () => {
    const updatedIsSubmitted = JSON.parse(JSON.stringify(isSubmitted));
    updatedIsSubmitted[questionIndex] = true;
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
            {timer.minutes}:{timer.seconds}
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
            id={index == questionIndex ? 'selectedButton' : ''}
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
          <h1 className='text questionText'>{prompts[questionIndex]}</h1>
        </div>

        <div>
          <form>
            <input
              id='textInput'
              type='text'
              className='form-control'
              disabled={isSubmitted[questionIndex]}
              placeholder='Your answer goes here...'
              value={answers[questionIndex]}
              onChange={(e) => handleAnswerInputChange(e.target.value)}
            />
          </form>
        </div>
        <div className='d-flex justify-content-center'>
          <button
            type='button'
            disabled={isSubmitted[questionIndex]}
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
              if (questionIndex != 0) setQuestion_index(questionIndex - 1);
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
              if (questionIndex != prompts.length - 1)
                setQuestion_index(questionIndex + 1);
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
