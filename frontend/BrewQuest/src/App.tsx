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
  EditProfile,
} from './containers/index';
import MarkingPage from './containers/HostGame/MarkingPage';
import SubmittedAnswer from './components/SubmittedAnswer/SubmittedAnswer';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Landing></Landing>} />
          <Route path='/quizEdit' element={<QuizEdit />} />
          <Route path='/register' element={<Register />} />
          <Route path='/host/*' element={<Host />} />
          <Route path='/channel' element={<Channel />} />
          <Route path='/gamepin' element={<GamePin />} />
          <Route path='/game' element={<ClientGame />} />
          <Route path='/editprofile' element={<EditProfile />} />
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
