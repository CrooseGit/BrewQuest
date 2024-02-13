import Navbar from './Navbar.tsx';
import QuizList from './QuizList.tsx';
import HostButton from './HostButton.tsx'
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