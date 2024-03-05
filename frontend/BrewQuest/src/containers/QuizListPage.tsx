import Navbar from '../components/Navbar/Navbar.tsx';
import QuizList from '../components/QuizList/QuizList.tsx';
import HostButton from './HostButton.tsx';
import './QuizListPage.css';

const QuizListPage = () => {
  return (
    //page
    <div>
      <Navbar></Navbar>
      <div>
        <QuizList></QuizList>

        <HostButton></HostButton>
      </div>
    </div>
  );
};

export default QuizListPage;
