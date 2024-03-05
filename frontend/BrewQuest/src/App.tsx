import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  Landing,
  Register,
  GamePin,
  QuizEdit,
  Leaderboard,
  Host,
} from './containers/index';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing></Landing>} />
        <Route path='/gamePin' element={<GamePin />} />
        <Route path='/quizEdit' element={<QuizEdit />} />
        <Route path='/register' element={<Register />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/host/*' element={<Host />} />
      </Routes>
    </>
  );
}

export default App;
