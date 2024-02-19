import BackButton from '../components/BackButton/BackButton';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../containers/QuizEdit.css';

const QuizEditContainer: React.FC = () => {
  const handleBackButtonClick = () => {
    // Replace this with actual functionality when other view exists
    console.log('Going Back');
  };

  const handleSaveButtonClick = () => {
    // Replace this with actual functionality when other view exists
    console.log('Saving Quiz');
  };

  const [quizzes, setQuizzes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await axios.get(`/api/quizzes/?page=${currentPage}`);
      setQuizzes(response.data);
    };
    fetchQuizzes();
  }, [currentPage]);

  return (
    <>
      <div className='header'>
        <BackButton onClick={handleBackButtonClick}/>
        <h1 className='title'>Quiz Title</h1>
        <Button onClick={handleSaveButtonClick}>Save & Exit</Button>
      </div>
      <div>
        <Pagination>
          <Pagination.Item>{currentPage}</Pagination.Item>
        </Pagination>
        <br />
      </div>


    </>
  );
};

export default QuizEditContainer;
