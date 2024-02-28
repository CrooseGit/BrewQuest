import './App.css';
import { Routes, Route } from 'react-router-dom';

import {
  GamePin,
  Landing,
  Login,
  Register,
  Placeholder,
  QuizEdit,
  TobyEdit,
 
} from './containers/index';
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
        <Route path='/tobyedit' element={<TobyEdit />}></Route>
        <Route path = 'quizpageclient' element="QuestionPageClient"></Route>

      </Routes>
    </>
  );
}

export default App;
