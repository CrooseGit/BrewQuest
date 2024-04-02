import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  Landing,
  Register,
  GamePin,
  QuizEdit,
  Leaderboard,
  Host,
  Channel,
  GameLobby,
} from './containers/index';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing></Landing>} />
        <Route path='/quizEdit' element={<QuizEdit />} />
        <Route path='/register' element={<Register />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/host/*' element={<Host />} />
        <Route path='/channel' element={<Channel />} />
        <Route path='/gamepin' element={<GamePin />} />
        <Route path='/lobby' element={<GameLobby />} />
      </Routes>
    </>
  );
}

export default App;
