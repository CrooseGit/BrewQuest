import './App.css';
import {Routes,Route} from "react-router-dom";
import {Landing,Login,Register,GamePin,QuizListPage,QPC,TobyEdit,QuizEdit,} from './containers/index';
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
      <Route path="/tobyedit" element={<TobyEdit/>}></Route>
      
      <Route path="/qpc" element={<QPC/>}></Route>
      <Route path="/register" element={<Register/>}></Route>

    
      
    </Routes>

    </>
  );
}

export default App;
