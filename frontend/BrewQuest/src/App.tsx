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
} from './containers/index';
import { useState } from 'react';

function App() {
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing></Landing>} />

        <Route path='/quizEdit' element={<QuizEdit />} />
        <Route path='/register' element={<Register />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route
          path='/host/*'
          element={
            <Host room={room} name={name} setRoom={setRoom} setName={setName} />
          }
        />
        <Route path='/channel' element={<Channel />} />

        <Route
          path='/gamepin'
          element={
            <GamePin
              room={room}
              name={name}
              setRoom={setRoom}
              setName={setName}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
