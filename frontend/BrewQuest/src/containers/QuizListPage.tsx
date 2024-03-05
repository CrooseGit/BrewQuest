import Navbar from '../components/Navbar/Navbar.tsx';
import QuizList from './QuizList.tsx';
import HostButton from './HostButton.tsx';
import '../index.css';

const QuizListPage = () => {
  return (
    //page
    <div>
      <Navbar></Navbar>
      <div>
        <QuizList></QuizList>
        <button type='button' className='fs-1 newQuizButton'>
          +
        </button>
        <HostButton></HostButton>
      </div>
    </div>
  );
};

export default QuizListPage;
