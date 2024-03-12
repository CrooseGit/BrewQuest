import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const [roundName, setRoundName] = useState('Loading');
  const [question_index, setQuestion_index] = useState(0);
  const [prompts, setPrompts] = useState(['Loading']);
  const [answers, setAnswers] = useState(['Loading']);

  useEffect(() => {
    axios
      .post('http://localhost:8000/api/quizInfo/', {quiz_id: quizId})
      .then((response) => {
        const data = response.data;
        setQuizName(data.name);
        const roundNames = data.rounds.map(round => round.title);
        const roundIds = data.rounds.map(round => round.id);
        setRounds(roundNames);
        setRoundIds(roundIds);
        setSelectedRoundId(roundIds[0]);
        setRoundName(roundNames[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  useEffect(() => {
    axios
      .post('http://localhost:8000/api/questionsAndAnswers/', {round_id: selectedRoundId})
      .then((response) => {
        const data = response.data;
        const prompts = data.map(question => question.prompt);
        const answers = data.map(question => question.answer);
        setPrompts(prompts);
        setAnswers(answers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedRoundId]);

  const handleNameInputChange = (input: string) => {
    setQuizName(input);
  };

  const handleRoundNameInputChange = (input: string) => {
    const updatedRounds = rounds.map((round, index) => {
      if (index == selectedRound) {
        return input;
      }
      return round;
    });
    setRounds(updatedRounds);
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

  const handleDelQuestion = (index: number) => {
    setPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts.splice(index, 1);
      return updatedPrompts;
    });
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers.splice(index, 1);
      return updatedAnswers;
    });
    if (question_index >= prompts.length - 1) {
      setQuestion_index(question_index - 1);
    }
  };

  const handleNewRound = () => {
  
  };

  const handleDelRound = () => {

  };

  return (
    <div className='box'>
      <div className='topBar d-flex justify-content-between align-items-center p-2'>
        {/*<div className='d-flex justify-content-between align-items-center'>
          <form>
            <select
              className='roundSelect p-2'
              value={rounds[selectedRound]}
              onChange={(e) => {
                setSelectedRound(rounds.indexOf(e.target.value))
                setSelectedRoundId(roundIds[rounds.indexOf(e.target.value)])
              }}
            >
              {rounds.map((round, index) => (
                <option key={index} value={round}>
                  {round}
                </option>
              ))}
            </select>
          </form>
          <button
            type='button'
            className='btn roundButton'
            id='newRoundButton'
            onClick={() => {
              handleNewRound();
            }}
          >
            <h1 className='fw-bolder'>+</h1>
          </button>
          </div>*/}
        <div className="input-group mb-3 roundSelect">
          <input
            className='form-control'
            placeholder='Round name goes here...'
            value={rounds[selectedRound]}
            onChange={(e) => handleRoundNameInputChange(e.target.value)}
          />
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
          <ul className="dropdown-menu dropdown-menu-end">
            {rounds.map((round, index) => (
              <button
                className='dropdown-item'
                key={round}
                onClick={() => {
                  setSelectedRound(index);
                  setSelectedRoundId(roundIds[index]);
                }}
              >
                {round}
              </button>
            ))}
            <li><hr className="dropdown-divider"></hr></li>
            <button className='dropdown-item' id='newRoundBtn' onClick={handleNewRound}>New</button>
            <button className='dropdown-item' id='delRoundBtn' onClick={handleDelRound}>Delete</button>
          </ul>
        </div>
        <div>
          <form>
            <input
              id='textInput'
              className='form-control'
              placeholder='Quiz name goes here...'
              value={quizName}
              onChange={(e) => handleNameInputChange(e.target.value)}
            />
          </form>
        </div>
        <div>
          <Link
            to='/host/quizlist'
          >
            <button
              type='button'
              className='btn p-2 submitAllButton'
            >
              <h5 className='text'>Exit</h5>
            </button>
          </Link>
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
          <div className='d-flex justify-content-between p-2'>
            <label htmlFor='questionInput' className='h3'>
              Question
            </label>
            <button
              type='button'
              className='btn btn-custom delBtn'
              onClick={() => handleDelQuestion(question_index)}
              disabled={prompts.length === 1}
            >
              <h6 className='text'>Delete</h6>
            </button>
          </div>
          <input
            id='questionInput'
            className='form-control questionEditText'
            value={prompts[question_index]}
            placeholder='Question goes here...'
            onChange={(e) => handleQuestionInputChange(e.target.value)}
          />
        </div>

        <div>
          <form>
            <input
              id='textInput'
              className='form-control'
              placeholder='Answer goes here...'
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
