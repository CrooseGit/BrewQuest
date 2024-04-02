import Navbar from '../components/Navbar/Navbar.tsx';
import QuizList from '../components/QuizList/QuizList.tsx';
import HostButton from '../components/HostButton/HostButton.tsx';
import HostLobby from './HostLobby.tsx';
import './QuizListPage.css';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { redirect} from 'react-router-dom';


const QuizListPage = () => {
  // This file provides the page where a host can see a list of all their quizzes
  // TODO: disable host button if no quiz selected
  const [quizToHost, setQuizToHost] = useState({ title: 'Loading', id: -1 });
  const [hostToLobby, setHostToLobby] = useState(false);
  const [room,setRoom] = useState<String>("");
  
  return (
    <div>
     {hostToLobby ? <HostLobby quizTitle = {quizToHost.title} quizId = {quizToHost.id} room = {quizToHost.title.replace(/ /g,"_")+"_"+quizToHost.id.toString()}/> :
     <>
      <Navbar></Navbar>
      <div>
        <QuizList setQuizToHost={setQuizToHost}></QuizList>

        <HostButton quizToHost={quizToHost} setHostToLobby={setHostToLobby}></HostButton>
      </div> 
      </>}
      
    </div>
  );
};

export default QuizListPage;
