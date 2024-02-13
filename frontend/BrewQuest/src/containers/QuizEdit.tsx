import React from 'react';
import '../containers/QuizEdit.css';

const QuizEditContainer: React.FC = () => {
  return (
    <div>
      <h1 className='text'>Edit Quiz</h1>
      <div>
        <div>
          <button type='button' className='text'>Add New Question</button>
        </div>
        <div>
          <h2>Edit Existing Questions</h2>
          <div>
            <div>
              <div>
                <h3 className='text'>Question 1</h3>
                <button className='text'>Edit</button>
                <button className='text'>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizEditContainer;
