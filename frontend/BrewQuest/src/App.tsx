import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  Landing,
  Register,
  GamePin,
  QuizListPage,
  TobyEdit,
  QuizEdit,
  Leaderboard,
  Host,
} from './containers/index';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing></Landing>} />
        <Route path='/gamepin' element={<GamePin />} />
        <Route path='/quizlist' element={<QuizListPage />} />
        <Route path='/quizedit' element={<QuizEdit />} />
        <Route path='/tobyedit' element={<TobyEdit />} />
        <Route path='/register' element={<Register />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        {/* <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} /> */}
        <Route path='/host/*' element={<Host />} />
      </Routes>
    </>
  );
}

export default App;
