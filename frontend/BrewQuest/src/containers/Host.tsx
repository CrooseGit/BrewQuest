import { Route, Routes } from 'react-router-dom';
import { Login, Logout, QuizEdit, QuizListPage } from '.';
import QuestionPageClient from './QuestionPageClient';
const Host = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/qpc' element={<QuestionPageClient />} />
        <Route path='/QuizList' element={<QuizListPage />} />
        <Route path='/edit' element={<QuizEdit />} />
      </Routes>
    </>
  );
};
export default Host;
