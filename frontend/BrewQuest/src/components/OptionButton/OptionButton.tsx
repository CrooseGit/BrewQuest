import { useState } from 'react';
import option_image from '../../assets/three_dots.svg';
// import { MouseEventHandler } from 'react';

// interface OptionButtonProps {
//   onClick?: MouseEventHandler;
//   className?: string;
// }



// { onClick, className }: OptionButtonProps
const OptionButton = (props) => {

  const quizId=props.quizId;
  console.log(quizId);

  const [optionDropdownVisible, setOptionDropdownVisible] = useState(false);
  const toggleOptionDropdown = () => {
    setOptionDropdownVisible(!optionDropdownVisible);
  };

  return (
    // className={'d-inline-flex align-items-start ' + className}
        // onClick={onClick}
    <div>
      
      <div className='option-dropdown' >
        <button tabIndex={0} className="option-button" onClick={toggleOptionDropdown}> {/* tab index for dropdown menu to appear in safari, temporary fix */}
          <img src={option_image} className='option-icon' />
        </button>
        {optionDropdownVisible && <div className='shown-options'>
          <button className='shown-option-button first-button'>Duplicate</button> {/*use axios api to ask to duplicate quiz item with given id number*/}
          <button className='shown-option-button'>Edit</button> {/*link to different page with given id number*/}
          <button className='shown-option-button last-button'>Delete</button> {/*use axios api to ask to delete quiz item with given id number*/}
        </div>}
      </div>
    </div>
  );
};
export default OptionButton;
