import Navbar from '../components/Navbar/Navbar.tsx';
import QuizList from '../components/QuizList/QuizList.tsx';
import HostButton from '../components/HostButton/HostButton.tsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const QuizListPage = () => {
  // This file provides the page where a host can see a list of all their quizzes
  // TODO: disable host button if no quiz selected
  const [quizToHost, setQuizToHost] = useState({ title: 'Loading', id: -1 });

  return (
    <div>
      <>
        <Navbar></Navbar>
        <div>
          <QuizList
            onQuizSelected={(quiz: { title: string; id: number }) => {
              setQuizToHost(quiz);
            }}
          ></QuizList>
          <Link
            to={'/host/game'}
            style={{ textDecoration: 'none' }}
            state={{
              title: quizToHost.title,
              id: quizToHost.id,
              room:
                quizToHost.title.replace(/ /g, '_') +
                '_' +
                quizToHost.id.toString(),
            }}
          >
            <HostButton />
          </Link>
        </div>
      </>
    </div>
  );
};

export default QuizListPage;
