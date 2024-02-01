import './App.css';

import {Landing,Login,Register} from "./containers/index";
import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <>
    
  <Routes>
    <Route path="/" element={<Landing></Landing>}></Route>
    <Route path="/Login" element={<Login></Login>}></Route>
    <Route path="/Register" element={<Register></Register>}></Route>
    
    </Routes>
    </>
  );
}

export default App;
