import './App.css';
import {Routes,Route} from "react-router-dom";

import {GamePin,Landing,Login,Register,Placeholder,QuizListPage,QuizEdit,QuestionPageClient} from './containers/index';


function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Landing></Landing>}></Route>
      <Route path="/gamepin" element={<GamePin/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/quizlist" element={<QuizListPage/>}></Route>
      <Route path="/quizedit" element={<QuizEdit/>}></Route>
      <Route path="/quizplay" element={<QuestionPageClient/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/placeholder" element={<Placeholder/>}></Route>
    </Routes>

    </>
  );
}

export default App;
