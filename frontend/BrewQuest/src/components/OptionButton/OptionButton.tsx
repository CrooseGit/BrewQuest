import { useState } from 'react';
import option_image from '../../assets/three_dots.svg';
import axios from 'axios';

interface OptionButtonProps {
  quizId: number;
  reloadFunction: () => void;
}

const OptionButton = ({ quizId, reloadFunction }: OptionButtonProps) => {
  const [optionDropdownVisible, setOptionDropdownVisible] = useState(false);

  const toggleOptionDropdown = () => {
    setOptionDropdownVisible(!optionDropdownVisible);
  };

  const handleDelete = () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('access_token')}`;
    axios
      .post('http://localhost:8000/api/deleteQuiz/', { id: quizId })
      .then(reloadFunction)
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDuplicate = () => {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${localStorage.getItem('access_token')}`;
    axios
      .post('http://localhost:8000/api/duplicateQuiz/', { id: quizId })
      .then(reloadFunction)
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className='option-dropdown'>
        <button
          tabIndex={0}
          className='option-button'
          onClick={toggleOptionDropdown}
        >
          {' '}
          {/* tab index for dropdown menu to appear in safari, temporary fix */}
          <img src={option_image} className='option-icon' />
        </button>
        {optionDropdownVisible && (
          <div className='shown-options'>
            <button
              className='shown-option-button first-button'
              type='button'
              onClick={() => {
                setOptionDropdownVisible(false);
                handleDuplicate();
              }}
            >
              Duplicate
            </button>

            <button className='shown-option-button'>Edit</button>
            <button
              className='shown-option-button last-button'
              type='button'
              onClick={() => {
                setOptionDropdownVisible(false);
                handleDelete();
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default OptionButton;
