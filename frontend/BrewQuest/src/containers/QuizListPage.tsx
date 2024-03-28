import Navbar from '../components/Navbar/Navbar.tsx';
import QuizList from '../components/QuizList/QuizList.tsx';
import HostButton from '../components/HostButton/HostButton.tsx';
import './QuizListPage.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const QuizListPage = () => {
  // This file provides the page where a host can see a list of all their quizzes
  // TODO: disable host button if no quiz selected
  const [quizToHost, setQuizToHost] = useState({ title: 'Loading', id: -1 });
  
  
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <QuizList setQuizToHost={setQuizToHost}></QuizList>

        <HostButton quizToHost={quizToHost}></HostButton>
      </div>
    </div>
  );
};

export default QuizListPage;
