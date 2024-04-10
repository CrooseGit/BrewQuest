import axios from 'axios';
import ip from '../../info';
import { useState, useEffect } from 'react';
import OptionButton from '../OptionButton/OptionButton';

const QuizList = ({
  onQuizSelected,
}: {
  onQuizSelected: (quiz: { title: string; id: number }) => void;
}) => {
  // set up items list structure
  // sample quiz array

  const [quizzes, setQuizzes] = useState([{ title: 'Loading', id: -1 }]);

  //set selected item structure

  const loadQuizzes = () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('access_token')}`;
    axios
      .get('http://' + ip + ':8000/api/quizzes/', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
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
      .post('http://' + ip + ':8000/api/createQuiz/')
      .then(loadQuizzes)
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    loadQuizzes();
  }, []);

  const quizElements =
    quizzes &&
    quizzes.map((quizItem) => [
      <input
        key={'quiz_' + quizItem.id + '_input'}
        type='radio'
        className='btn-check quiz-item-input'
        name='quizList'
        id={quizItem.id.toString()}
        // called when item is selected and selected item has changed
        onChange={() => {
          onQuizSelected(quizItem);
        }}
      ></input>,

      <label
        key={'quiz_' + quizItem.id + '_label'}
        className='btn quiz-item-selection'
        htmlFor={quizItem.id.toString()}
      >
        <div key={'quiz_' + quizItem.id + '_title'} className='quiz-item-title'>
          {quizItem.title}
        </div>
        <OptionButton
          key={'quiz_' + quizItem.id + '_optionButton'}
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
