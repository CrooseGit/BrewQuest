import Navbar from '../components/Navbar/Navbar.tsx';
import QuizList from '../components/QuizList/QuizList.tsx';
import HostButton from '../components/HostButton/HostButton.tsx';

const QuizListPage = () => {
  // This file provides the page where a host can see a list of all their quizzes
  return (
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
