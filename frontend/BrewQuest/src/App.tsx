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
  ClientGame,
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
        <Route path='/game' element={<ClientGame />} />
      </Routes>
    </>
  );
}

export default App;
