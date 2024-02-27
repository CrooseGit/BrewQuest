import './App.css';
import {Routes,Route} from "react-router-dom";
import {GamePin,Landing,Login,Register,Placeholder,QuizListPage,QuizEdit2, QuizEdit,QuestionPageClient} from './containers/index';
import { HelloWorld } from './apis';

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
      <Route path="/helloworld" element={<HelloWorld/>}></Route>
      
    </Routes>

    </>
  );
}

export default App;
