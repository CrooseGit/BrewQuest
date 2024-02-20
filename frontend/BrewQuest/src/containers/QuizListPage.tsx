import Navbar from './Navbar.tsx';
import QuizList from './QuizList.tsx';
import './QuizListPage.css';

const QuizListPage = () => {
  return (
    //page
    <div>
        {/* navbar */}
        <Navbar></Navbar>
        <QuizList></QuizList>
    </div>
    
  );
};

export default QuizListPage;