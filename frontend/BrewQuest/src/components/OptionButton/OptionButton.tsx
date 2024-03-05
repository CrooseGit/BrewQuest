import { useState } from 'react';
import option_image from '../../assets/three_dots.svg';
import axios from 'axios';
//import { MouseEventHandler } from 'react';

interface OptionButtonProps {
  quizId: number;
  reloadFunction: () => void;
}

const OptionButton = ({ quizId, reloadFunction }: OptionButtonProps) => {
  //console.log(quizId);

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

  return (
    // className={'d-inline-flex align-items-start ' + className}
    // onClick={onClick}
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
            <button className='shown-option-button first-button'>
              Duplicate
            </button>
            {/*use axios api to ask to duplicate quiz item with given id number*/}
            <button className='shown-option-button'>Edit</button>
            {/*link to different page with given id number*/}
            <button
              className='shown-option-button last-button'
              type='button'
              onClick={handleDelete}
            >
              Delete
            </button>
            {/*use axios api to ask to delete quiz item with given id number*/}
          </div>
        )}
      </div>
    </div>
  );
};
export default OptionButton;
