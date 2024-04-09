import axios from 'axios';
import { useState, useEffect } from 'react';
import OptionButton from '../OptionButton/OptionButton';

const QuizList = () => {
  // set up items list structure
  // sample quiz array

  const [quizzes, setQuizzes] = useState([{ title: 'Loading', id: -1 }]);

  //set selected item structure
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const loadQuizzes = () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('access_token')}`;
    axios
      .get('http://localhost:8000/api/quizzes/', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data.quizzes);
        setQuizzes(response.data.quizzes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createQuiz = () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('access_token')}`;
    axios
      .post('http://localhost:8000/api/createQuiz/')
      .then(loadQuizzes)
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    loadQuizzes();
  }, []);

  useEffect(() => {
    console.log(selectedQuiz);
  });

  const quizElements =
    quizzes &&
    quizzes.map((quizItem) => [
      <input
        key={'quiz_' + quizItem.id}
        type='radio'
        className='btn-check quiz-item-input'
        name='quizList'
        id={quizItem.id.toString()}
        // called when item is selected and selected item has changed
        onChange={() => setSelectedQuiz(quizItem)}
      ></input>,

      <label
        className='btn quiz-item-selection'
        htmlFor={quizItem.id.toString()}
      >
        <div className='quiz-item-title'>{quizItem.title}</div>
        <OptionButton
          quizId={quizItem.id}
          reloadFunction={loadQuizzes}
        ></OptionButton>
      </label>,
    ]);

  return (
    <div className='boxContainer'>
      
      <div className='btn-group-vertical quiz-button-group' role='group'>
        <label className='btn quiz-list-head'>Quizzes</label>
        {quizElements}
      </div>

      <button
        type='button'
        onClick={createQuiz}
        className='btn fs-1 newQuizButton'
      >
        +
      </button>
    </div>
  );
};

export default QuizList;
