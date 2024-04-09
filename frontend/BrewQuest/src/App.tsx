import './styles.css';
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
          <Route path='/gamepin' element={<GamePin />} />
          <Route path='/game' element={<ClientGame />} />
          <Route path='/editprofile' element={<EditProfile />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
