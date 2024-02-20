import './OptionButton.css';
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
      onClick={onClick}
    >
      <div className='p-2'>
        <img src={option_image} className='option_icon' />
      </div>
    </div>
  );
};
export default OptionButton;
