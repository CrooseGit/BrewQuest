import BackButton from '../components/BackButton/BackButton';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import React from 'react';
import '../containers/QuizEdit.css';

let active = 1;
let items: JSX.Element[] = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const QuizEditContainer: React.FC = () => {
  const handleBackButtonClick = () => {
    // Replace this with actual functionality when other view exists
    console.log('Going Back');
  };

  const handleSaveButtonClick = () => {
    // Replace this with actual functionality when other view exists
    console.log('Saving Quiz');
  };

  return (
    <>
      <div className='header'>
        <BackButton onClick={handleBackButtonClick}/>
        <h1 className='title'>Quiz Title</h1>
        <Button onClick={handleSaveButtonClick}>Save & Exit</Button>
      </div>
      <div>
        <Pagination>{items}</Pagination>
        <br />
      </div>


    </>
  );
};

export default QuizEditContainer;
