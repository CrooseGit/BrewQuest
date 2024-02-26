import './App.css';
import { Routes, Route } from 'react-router-dom';


import GamePin from './containers/GamePin';
import Landing from './containers/Landing';
import Login from './containers/Login';
import Register from './containers/Register';
import Placeholder from './containers/Placeholder';
import QuizListPage from './containers/QuizListPage';
import QuestionPageClient from './containers/QuestionPageClient';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing></Landing>}></Route>
        <Route path='/gamepin' element={<GamePin />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/placeholder' element={<Placeholder />}></Route>
        <Route path='/qpc' element={<QuestionPageClient />} />
        <Route path='/loq' element={<QuizListPage />} />
      </Routes>
    </>
  );
}

export default App;
