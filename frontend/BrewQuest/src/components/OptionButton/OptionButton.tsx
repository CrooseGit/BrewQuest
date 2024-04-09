import { useState } from 'react';
import option_image from '../../assets/three_dots.svg';
import axios from 'axios';
import ip from '../../info';
import { Link } from 'react-router-dom';

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
      .post('http://' + ip + ':8000/api/deleteQuiz/', { id: quizId })
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
      .post('http://' + ip + ':8000/api/duplicateQuiz/', { id: quizId })
      .then(reloadFunction)
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button
        tabIndex={0}
        className='option-button'
        onClick={toggleOptionDropdown}
      >
        {' '}
        {/* tab index for dropdown menu to appear in safari, temporary fix */}
        <img src={option_image} className='option-icon' />
      </button>

      <div className='option-dropdown'>
    
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
            <Link
              to='/host/edit'
              state={{ quiz_id: quizId }} // passes id as prop
              style={{ textDecoration: 'none' }}
            >
              <button
                className='shown-option-button'
                type='button'
                onClick={() => {}}
              >
                Edit
              </button>
            </Link>

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
