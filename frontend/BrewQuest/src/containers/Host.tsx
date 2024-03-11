import { Route, Routes } from 'react-router-dom';
import { Login, Logout, QuizEdit, QuizListPage, Register } from '.';
import QuestionPageClient from './QuestionPageClient';
const Host = () => {
  // This file provides the routing for all the host's views
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/qpc' element={<QuestionPageClient />} />
        <Route path='/QuizList' element={<QuizListPage />} />
        <Route path='/edit' element={<QuizEdit />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
};
export default Host;
