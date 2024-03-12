import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../containers/QuizEdit.css';
const TobyEdit = () => {
  const location = useLocation();
  const { state } = location;
  const quizId = state && state.quiz_id;
  const [quizName, setQuizName] = useState('Loading');
  const [rounds, setRounds] = useState<string[]>(['Loading']);
  const [roundIds, setRoundIds] = useState([]);
  const [selectedRound, setSelectedRound] = useState(0);
  const [selectedRoundId, setSelectedRoundId] = useState(0);
  const [question_index, setQuestion_index] = useState(0);
  const [prompts, setPrompts] = useState(['Loading']);
  const [answers, setAnswers] = useState(['Loading']);

  useEffect(() => {
    axios
      .post('http://localhost:8000/api/quizInfo/', {quiz_id: quizId})
      .then((response) => {
        console.log('getting quiz info');
        const data = response.data;
        console.log(data)
        setQuizName(data.name);
        const roundNames = data.rounds.map(round => round.title);
        const roundIds = data.rounds.map(round => round.id);
        setRounds(roundNames);
        setRoundIds(roundIds);
        setSelectedRoundId(roundIds[0])
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  useEffect(() => {
    axios
      .post('http://localhost:8000/api/questionsAndAnswers/', {round_id: selectedRoundId})
      .then((response) => {
        console.log('getting questions');
        const data = response.data;
        console.log(data)
        const prompts = data.map(question => question.prompt);
        const answers = data.map(question => question.answer);
        setPrompts(prompts);
        setAnswers(answers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedRoundId]);

  {/*
  useEffect(() => {
    axios.get('http://localhost:8000/api/questions/').then((response) => {
      console.log('updating questions');
      const data = response.data;
      const roundNames = Object.keys(data.rounds);
      setPrompts(data.questions);
      //setAnswers(new Array(data.rounds[roundNames[selectedRound]]).fill(''));
      setQuestion_index(0);
    });
  }, [selectedRound]);
*/}
  const handleNameInputChange = (input: string) => {
    setQuizName(input);
  };

  const handleAnswerInputChange = (input: string) => {
    const a = JSON.parse(JSON.stringify(answers));
    a[question_index] = input;
    setAnswers(a);
  };

  const handleQuestionInputChange = (input: string) => {
    const a = JSON.parse(JSON.stringify(prompts));
    a[question_index] = input;
    setPrompts(a);
  };

  const handleNewQuestion = () => {
    setPrompts((prevPrompts) => [...prevPrompts, '']);
    setAnswers((prevAnswers) => [...prevAnswers, '']);
    setQuestion_index(prompts.length);
  };

  return (
    <div className='box'>
      <div className='topBar d-flex justify-content-between'>
        <div>
          <form className='p-2'>
            <select
              value={rounds[selectedRound]}
              onChange={(e) => setSelectedRound(rounds.indexOf(e.target.value))}
            >
              {rounds.map((round, index) => (
                <option key={index} value={round}>
                  {round}
                </option>
              ))}
            </select>
          </form>
        </div>
        <div>
          <form>
            <input
              id='textInput'
              type='text'
              className='form-control'
              placeholder='Quiz name goes here...'
              value={quizName}
              onChange={(e) => handleNameInputChange(e.target.value)}
            />
          </form>
        </div>
        <div>
          <button
            type='button'
            className='btn p-2 submitAllButton'
            onClick={() => alert('Takes user to quiz list screen')}
          >
            <h5 className='text'>Save & Exit</h5>
          </button>
        </div>
      </div>
      <div className='scrollMenu'>
        <button
          type='button'
          className='btn questionButton'
          id='newQuestionButton'
          onClick={() => {
            handleNewQuestion();
          }}
        >
          <h1 className='fw-bolder'>+</h1>
        </button>
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
        <div className='form mb-3'>
          <label htmlFor='questionInput' className='h3'>
            Question
          </label>
          <input
            type='text'
            id='questionInput'
            className='form-control questionEditText'
            value={prompts[question_index]}
            placeholder='Question'
            onChange={(e) => handleQuestionInputChange(e.target.value)}
          />
        </div>

        <div>
          <form>
            <input
              id='textInput'
              type='text'
              className='form-control'
              placeholder='Your answer goes here...'
              value={answers[question_index]}
              onChange={(e) => handleAnswerInputChange(e.target.value)}
            />
          </form>
        </div>
        <div></div>
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
export default TobyEdit;
