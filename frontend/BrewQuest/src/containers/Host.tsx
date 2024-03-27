import { Route, Routes } from 'react-router-dom';
import { Login, Logout, QuizEdit, QuizListPage, Register } from '.';
import GameLobby from './GameLobby';
import QuestionPageClient from './QuestionPageClient';
const Host = ({ room, name, setRoom, setName }: 
  { room: string, name: string, setRoom: React.Dispatch<React.SetStateAction<string>>, 
    setName: React.Dispatch<React.SetStateAction<string>> }) => {
  // This file provides the routing for all the host's views
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/qpc' element={<QuestionPageClient />} />
        <Route path='/QuizList' element={<QuizListPage />} />
        <Route path='/edit' element={<QuizEdit />} />
        <Route path='/register' element={<Register />} />
        <Route path='/lobby' element={<GameLobby room={room} name={name} setRoom={setRoom} setName={setName}/>}></Route>
        
        
      </Routes>
    </>
  );
};
export default Host;
