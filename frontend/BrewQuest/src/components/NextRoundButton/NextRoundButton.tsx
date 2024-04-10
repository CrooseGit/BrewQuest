import back_arrow_image from '../../assets/back_arrow.svg';
import { MouseEventHandler } from 'react';

interface BackButtonProps {
  onClick?: MouseEventHandler;
  className?: string;
}

const NextRoundButton = ({ onClick}: BackButtonProps) => {
  return (
    <button
      className={'d-inline-flex align-items-start mr-3 float-end text-light .btn-primary-outline'}
      onClick={onClick}
      >Start Next Round</button>
  );
};
export default NextRoundButton;
