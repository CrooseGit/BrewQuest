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
  EditProfile,
} from './containers/index';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [room, setRoom] = useState('');
  const [name, setName] = useState('');
  return (
    <>
    <AuthProvider>
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
    </AuthProvider>
    </>
  );
}

export default App;
