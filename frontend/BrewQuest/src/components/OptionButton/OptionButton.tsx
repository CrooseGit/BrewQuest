import option_image from '../../assets/three_dots.svg';
import { MouseEventHandler } from 'react';

interface OptionButtonProps {
  onClick?: MouseEventHandler;
  className?: string;
}

const OptionButton = ({ onClick, className }: OptionButtonProps) => {
  return (
    <div
      className={'d-inline-flex align-items-start ' + className}
      onClick={onClick}>
      
      <div className='option-dropdown'>
        <button tabIndex={0} className="option-button">
          <img src={option_image} className='option-icon' />
        </button>
        <div className='shown-options'>
          <div className='shown-option-button first-button'>Duplicate</div>
          <div className='shown-option-button'>Edit</div>
          <div className='shown-option-button last-button'>Delete</div>
        </div>
      </div>
    </div>
  );
};
export default OptionButton;
